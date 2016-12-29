var request = require('request')
var fs = require('fs');


function get_ethabig(url, url_lunch){

    request(
        {
            url: url,
            json: true
        }, function (error, response, body){
            if(!error && response.statusCode == 200){                
                fs.writeFileSync("mensas_abig.json","{");

                if (body.length != 0){
                    var to_write = ""; 
                    //console.log(body);
                    //irgendwas mit dem json machen:
                    var l = body.length;
                    for (var i = 0; i < l-1; i++) {
                        to_write = "\"" + body[i].mensa + "\":"+JSON.stringify(body[i]) + ",";
                        fs.appendFileSync("mensas_abig.json",to_write);
                    }
                    fs.appendFileSync("mensas_abig.json", "\"" + body[l-1].mensa + "\":"+JSON.stringify(body[l-1]) + "}");
                    console.log("succesfully got eth dinner");
                }
                else {
                    console.warn("empty menu received");
                    fs.appendFileSync("mensas_abig.json", "}");

                }
            }
            else {
                console.error("could not get eth dinner menu from internet");
                console.log(error);
                fs.writeFileSync("mensas_abig.json", "{}");
            }
            get_eth = require("./get_eth");
            get_eth.get_eth(url_lunch);
        });
};
module.exports.get_ethabig = get_ethabig;