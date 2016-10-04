var request = require('request');
var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;



function get_uni() {
    var urls = {
        'uni-unten': 'http://www.mensa.uzh.ch/menueplaene/zentrum-a',
        'uni-oben': 'http://www.mensa.uzh.ch/menueplaene/zentrum-b',
        'lichthof': 'http://www.mensa.uzh.ch/menueplaene/lichthof-rondell',
        'irchel': 'http://www.mensa.uzh.ch/menueplaene/mensa-uzh-irchel',
        'tierspital': 'http://www.mensa.uzh.ch/menueplaene/cafeteria-uzh-tierspital',
        'zahnarzt': 'http://www.mensa.uzh.ch/menueplaene/cafeteria-zzm',
        'platte': 'http://www.mensa.uzh.ch/menueplaene/cafeteria-uzh-plattenstrasse'
    };
    // var urlArray = [
    //     'http://www.mensa.uzh.ch/menueplaene/zentrum-a', 'http://www.mensa.uzh.ch/menueplaene/zentrum-b', 'http://www.mensa.uzh.ch/menueplaene/lichthof-rondell',
    //     'http://www.mensa.uzh.ch/menueplaene/mensa-uzh-irchel', 'http://www.mensa.uzh.ch/menueplaene/cafeteria-uzh-tierspital', 'http://www.mensa.uzh.ch/menueplaene/cafeteria-zzm',
    //     'http://www.mensa.uzh.ch/menueplaene/cafeteria-uzh-plattenstrasse'
    // ]
    // var mensaArray = [
    //     'uni_unten', 'mensa_oben', 'lichthof', 'irchel', 'zahnarzt', 'tierspital', 'platte'
    // ]
    var weekdays = ['_so', '_mo', '_di', '_mi', '_do', '_fr'];
    var d = new Date();
    var requests = 0;
    var mensas =  require('./mensas.json');

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
                    console.log('getting ' + mensaName);
                    var document = parse5.parse(body.toString());
                    var xhtml = xmlser.serializeToString(document);
                    var doc = new dom().parseFromString(xhtml);
                    var select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
                    var nodes = select("//x:div[@class='news']/x:div//text()", doc);
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
                            "mealtime": [{
                                "from": "11:00",
                                "to": "14:30"
                                }]
                        },
                        "location": {
                            "id": 1,
                            "label": "zentrum"
                        }
                    };

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
                            currentMeal.label = nodes[i].data;

                        }
                        else if (nodes[i].parentNode.localName === "span") {
                            nodes[i].data = nodes[i].data.replace(/\|\sCHF\s/gm, "");
                            priceArray = nodes[i].data.split(' / ');
                            currentMeal.prices.student = priceArray[0];
                            currentMeal.prices.staff = priceArray[1];
                            currentMeal.prices.extern = priceArray[2];
                        }
                        else if (nodes[i].parentNode.localName === "p") {
                            currentMeal.description.push(nodes[i].data);
                        }
                    }
                    mensas[mensaName] = thisMensa;
                    console.log(mensaName + ' done');
                    requests--;
                    if (requests == 0) {
                        done();
                    }

                });
        })(mensas, mensa, url);
    }

};

function done() {
    console.log("DONE");
    console.log(mensas);
    require('fs').writeFileSync('./mensas.json', JSON.stringify(mensas));
    console.log('file written');
}

