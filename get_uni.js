var request = require('request');
var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;
var requests = 0;
var mensas = require('./mensas.json');
var mensas_abig = require('./mensas_abig.json')

function get_uni() {
    var urls = {
        'UZH untere Mensa A': 'http://www.mensa.uzh.ch/de/menueplaene/zentrum-mercato/',
        'UZH obere Mensa B': 'http://www.mensa.uzh.ch/de/menueplaene/zentrum-mensa/',
        'UZH Lichthof': 'http://www.mensa.uzh.ch/de/menueplaene/lichthof-rondell/',
        'UZH Irchel': 'http://www.mensa.uzh.ch/de/menueplaene/mensa-uzh-irchel/',
        'UZH Tierspital': 'http://www.mensa.uzh.ch/de/menueplaene/cafeteria-uzh-tierspital/',
        'UZH Zentrum Für Zahnmedizin': 'http://www.mensa.uzh.ch/de/menueplaene/cafeteria-zzm/',
        'UZH Platte': 'http://www.mensa.uzh.ch/de/menueplaene/cafeteria-uzh-plattenstrasse/',
        'UZH Rämi 59 (vegan)': 'http://www.mensa.uzh.ch/de/menueplaene/raemi59/'
    };
    var urls_abig = {
        'UZH untere Mensa A (abend)': 'http://www.mensa.uzh.ch/de/menueplaene/zentrum-mercato-abend/',
        'UZH Irchel (abend)': 'http://www.mensa.uzh.ch/de/menueplaene/irchel-cafeteria-seerose-abend/'
    }
    var weekdays = ['', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'];
    var d = new Date();



    //mensa_loop = thismensa_loop;
    for (var mensa in urls) {
        requests++;
        url = urls[mensa] + weekdays[d.getDay()] + '.html';
        (function fetchMensa(mensas, mensaName, url) {

            // console.log('getting ' + mensaName);
            request(
                {
                    followRedirect: true,
                    removeRefererHeader: true,
                    url: url,
                    followAllRedirects: true,
                    //encoding: 'binary'
                    //json: true
                }, function (error, response, body) {
                    if(!error && response.statusCode == 200){ 
                        makeObject(body, false, mensaName);
                    }
                    else {
                        console.error("could not get uni " + mensaName  + " lunch menu from internet");
                        console.log(error);
                    }
                });
        })(mensas, mensa, url);
    }

    for (var mensa in urls_abig) {
        requests++;
        url = urls_abig[mensa] + weekdays[d.getDay()] + '.html';
        (function fetchMensa(mensas, mensaName, url) {

            // console.log('getting ' + mensaName);
            request(
                {
                    followRedirect: true,
                    removeRefererHeader: true,
                    url: url,
                    followAllRedirects: true,
                    //encoding: 'binary'
                    //json: true
                }, function (error, response, body) {
                    if(!error && response.statusCode == 200){ 
                        makeObject(body, true, mensaName);
                    }
                    else {
                        console.error("could not get uni " + mensaName  + " dinner menu from internet");
                        console.log(error);
                    }
                });
        })(mensas_abig, mensa, url);
    }

};

function makeObject(body, isDinner, mensaName) {
    // console.log('parsing ' + mensaName);
    var document = parse5.parse(body.toString());
    var xhtml = xmlser.serializeToString(document);
    var doc = new dom().parseFromString(xhtml);
    var select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
    var nodes = select("//x:div[@class='mod mod-newslist']/x:ul/x:li/x:div/x:div//text()", doc);
    for (var i = nodes.length - 1; i >= 0; i--) {
        // remove all the fucking white spaces of this shitty html
        //nodes[i].data = nodes[i].data.replace(/(\r\n|\n|\r)/gm, "");
        nodes[i].data = nodes[i].data.trim();
        if (nodes[i].data == "") {
            nodes.splice(i, 1);
            continue;
        }
        //console.log(nodes[i].data);
    }
    if (nodes.length != 0){
        thisMensa = {
            "daytime": "lunch",
            "mensa": mensaName,
            "meals": [],
            "hours": {
                "opening": [
                    {
                        "from": "9:00",
                        "to": "18:00"
                    }
                ],
                "mealtime": [
                    {
                        "hardcoded": true,
                        "from": "lunch",
                        "to": "later"
                    },
                    {
                        "hardcoded": true,
                        "from": "dinner",
                        "to": "later"
                    }
                ]
            },
            "location": {
                "id": 1,
                "label": "zentrum"
            }
        };
        if (isDinner) thisMensa.daytime = "dinner";
        currentMeal = {
            "description": [],
            "prices": {}
        };
        for (var i = 0; i < nodes.length; i++) {

            if (nodes[i].parentNode.localName === "h3") {

                if (i != 0) {
                    thisMensa.meals.push(currentMeal);
                    currentMeal = {
                        "description": [],
                        "prices": {}
                    };
                }
                currentMeal.label = nodes[i].data;
            }
            else if (nodes[i].parentNode.localName === "span") {
                currentMeal.label = currentMeal.label + " " + nodes[i].data;
            }
            else if (nodes[i].parentNode.localName === "p") {
                currentMeal.description.push(nodes[i].data);
            }
        }
        thisMensa.meals.push(currentMeal);
        if (isDinner) {
            mensas_abig[mensaName] = thisMensa;
        } else {
            mensas[mensaName] = thisMensa;
        }
    }
    // console.log(mensaName + ' done');
    requests--;
    if (requests == 0) {
        done();
    }

}

function done() {
    //console.log(mensas);
    console.log('successfully got uni mensas');
    require('fs').writeFileSync('./mensas.json', JSON.stringify(mensas));
    require('fs').writeFileSync('./mensas_abig.json', JSON.stringify(mensas_abig));
    console.log('files written');
}
module.exports.get_uni = get_uni;
