var request = require("request");
var mensas = require("./mensas.json")
var mensas_abig = require("./mensas_abig.json");
var parseString = require('xml2js').parseString;

var mensas = require("./mensas.json");
var mensas_abig = require("./mensas_abig.json");
var requests = 0;

// get the uni menus using the api of zfv. the format is as follows: 
// http://zfv.ch/de/menus/rssMenuPlan?menuId=235&&dayOfWeek=1 
// menuid is the mensa id and dayOfWeek is monday = 1 ...

function get_uni() {
  // mensas in the evening need "abend" in the name
  var menu_ids = {
    "UZH untere Mensa A": 147,
    "UZH obere Mensa B": 148,
    "UZH Lichthof": 150,
    "UZH Irchel": 180,
    "UZH Tierspital": 146,
    "UZH Zentrum Für Zahnmedizin": 151,
    "UZH Platte": 143,
    "UZH Rämi 59 (vegi)": 346,
    "ZHDK Toni-Areal": 333,
    "UZH untere Mensa A (abend)": 149,
    "UZH Irchel (abend)": 256
  };
  let weekday = new Date().getDay();

  for (var mensa in menu_ids) {
    requests++;
    url = `http://zfv.ch/de/menus/rssMenuPlan?menuId=${menu_ids[mensa]}&dayOfWeek=${weekday}`;
    (function fetchMensa(mensas, mensaName, url) {
      // console.log('getting ' + mensaName);
      request({
          followRedirect: true,
          removeRefererHeader: true,
          url: url,
          followAllRedirects: true
          //encoding: 'binary'
          //json: true
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            makeObject(body, mensaName.indexOf("abend") != -1, mensaName);
          } else {
            console.error(
              "could not get uni " + mensaName + " lunch menu from internet"
            );
            console.log(error);
          }
        }
      );
    })(mensas, mensa, url);
  }
}

function makeObject(body, isDinner, mensaName) {
  var thisMensa = {
    daytime: "lunch",
    mensa: mensaName,
    meals: [],
    hours: {
      opening: [{
        from: "9:00",
        to: "18:00"
      }],
      mealtime: [{
          hardcoded: true,
          from: "lunch",
          to: "later"
        },
        {
          hardcoded: true,
          from: "dinner",
          to: "later"
        }
      ]
    },
    location: {
      id: 1,
      label: "zentrum"
    }
  };

  if (isDinner) thisMensa.daytime = "dinner";

  parseString(body, function (err, result) {
    if (result.feed.entry[0].summary[0].div[0].p) {
      var entries = result.feed.entry[0].summary[0].div[0].p.length;
      result = result.feed.entry[0].summary[0].div[0];
      var currentMeal = {};
      for (i = 0; i < entries; i++) {
        currentMeal = {
          description: [],
          prices: {}
        };
        currentMeal.label = result.h3[i]._.trim();
        if (result.h3[i].span[0]._)
          currentMeal.label = currentMeal.label + result.h3[i].span[0]._.trim();
        currentMeal.description.push(result.p[i]._.trim().replace(/  +/g, ' ').replace('\n \n', '\n'));
        thisMensa.meals.push(currentMeal);
      }
    }
  });
  console.log(thisMensa);

  if (isDinner) {
    mensas_abig[mensaName] = thisMensa;
  } else {
    mensas[mensaName] = thisMensa;
  }

  requests--;
  if (requests == 0) {
    done();
  }
}

function done() {
  //console.log(mensas);
  console.log("successfully got uni mensas");
  require("fs").writeFileSync("./mensas.json", JSON.stringify(mensas));
  require("fs").writeFileSync(
    "./mensas_abig.json",
    JSON.stringify(mensas_abig)
  );
  console.log("files written");
}
module.exports.get_uni = get_uni;
