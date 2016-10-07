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
        'uni-unten': 'http://www.mensa.uzh.ch/de/menueplaene/zentrum-a/',
        'uni-oben': 'http://www.mensa.uzh.ch/de/menueplaene/zentrum-b/',
        'lichthof': 'http://www.mensa.uzh.ch/de/menueplaene/lichthof-rondell/',
        'irchel': 'http://www.mensa.uzh.ch/de/menueplaene/mensa-uzh-irchel/',
        'tierspital': 'http://www.mensa.uzh.ch/de/menueplaene/cafeteria-uzh-tierspital/',
        'zahnarzt': 'http://www.mensa.uzh.ch/de/menueplaene/cafeteria-zzm/',
        'platte': 'http://www.mensa.uzh.ch/de/menueplaene/cafeteria-uzh-plattenstrasse/'
    };
    var urls_abig = {
        'uni-unten': 'http://www.mensa.uzh.ch/de/menueplaene/zentrum-a-abend/',
        'irchel': 'http://www.mensa.uzh.ch/de/menueplaene/irchel-cafeteria-seerose-abend/'
    }
    var weekdays = ['', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'];
    var d = new Date();



    //mensa_loop = thismensa_loop;
    for (var mensa in urls) {
        requests++;
        url = urls[mensa] + weekdays[d.getDay()] + '.html';
        (function fetchMensa(mensas, mensaName, url) {

            console.log('starting ' + mensaName);
            request(
                {
                    followRedirect: true,
                    removeRefererHeader: true,
                    url: url,
                    followAllRedirects: true,
                    encoding: 'binary'
                    //json: true
                }, function (error, response, body) {
                    makeObject(body, false, mensaName);
                });
        })(mensas, mensa, url);
    }

    for (var mensa in urls_abig) {
        requests++;
        url = urls_abig[mensa] + weekdays[d.getDay()] + '.html';
        (function fetchMensa(mensas, mensaName, url) {

            console.log('starting ' + mensaName);
            request(
                {
                    followRedirect: true,
                    removeRefererHeader: true,
                    url: url,
                    followAllRedirects: true,
                    encoding: 'binary'
                    //json: true
                }, function (error, response, body) {
                    makeObject(body, true, mensaName);
                });
        })(mensas_abig, mensa, url);
    }

};

function makeObject(body, isDinner, mensaName) {
    console.log('getting ' + mensaName);
    var document = parse5.parse(body.toString());
    var xhtml = xmlser.serializeToString(document);
    var doc = new dom().parseFromString(xhtml);
    var select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
    var nodes = select("//x:div[@class='mod mod-newslist']/x:ul/x:li/x:div/x:div//text()", doc);
    for (var i = nodes.length - 1; i >= 0; i--) {
        // remove all the fucking white spaces of this shitty html
        nodes[i].data = nodes[i].data.replace(/(\r\n|\n|\r)/gm, "");
        nodes[i].data = nodes[i].data.trim();
        if (nodes[i].data == "") {
            nodes.splice(i, 1);
            continue;
        }
        //console.log(nodes[i].data);
    }
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
        //console.log(nodes[i].data);
        if (nodes[i].data === "Öffnungszeiten") {
            thisMensa.meals.push(currentMeal);

            break;
        }
        if (nodes[i].parentNode.localName === "h3") {

            if (i != 0) {
                thisMensa.meals.push(currentMeal);
                currentMeal = {
                    "description": [],
                    "prices": {}
                };
            }

            if (nodes[i].data.includes('CHF')) {
                splitted = nodes[i].data.split('| ');
                splitted[1] = splitted[1].replace(/CHF\s/gm, "");
                priceArray = splitted[1].split(' / ');
                currentMeal.prices.student = priceArray[0];
                currentMeal.prices.staff = priceArray[1];
                currentMeal.prices.extern = priceArray[2];
                currentMeal.label = splitted[0].trim();
            } else{
                currentMeal.label = nodes[i].data;
            }
            

        }
        else if (nodes[i].parentNode.localName === "span") {

        }
        else if (nodes[i].parentNode.localName === "p") {
            currentMeal.description.push(nodes[i].data);
        }
    }
    if (isDinner) {
        mensas_abig[mensaName] = thisMensa;
    } else {
        mensas[mensaName] = thisMensa;
    }
    console.log(mensaName + ' done');
    requests--;
    if (requests == 0) {
        done();
    }

}

function done() {
    console.log("DONE");
    //console.log(mensas);
    require('fs').writeFileSync('./mensas.json', JSON.stringify(mensas));
    require('fs').writeFileSync('./mensas_abig.json', JSON.stringify(mensas_abig));
    console.log('file written');
}
module.exports.get_uni = get_uni;
