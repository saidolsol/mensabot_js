var request = require('request')
var fs = require('fs');


function get_ethabig(url, url_lunch){

    request(
        {
            url: url,
            json: true
        }, function (error, response, body){
            console.log(error);
            console.log(response);
            
            fs.writeFileSync("mensas_abig.json","{");

            var to_write = ""; 
            //console.log(body);
            //irgendwas mit dem json machen:
            console.log(body[0])
            var l = body.length;
            for (var i = 0; i < l-1; i++) {
                to_write = "\"" + body[i].mensa + "\":"+JSON.stringify(body[i]) + ",";
                fs.appendFileSync("mensas_abig.json",to_write);
            }
            fs.appendFileSync("mensas_abig.json", "\"" + body[l-1].mensa + "\":"+JSON.stringify(body[l-1]) + "}");
            get_eth = require("./get_eth");
            get_eth.get_eth(url_lunch);
        });
};
module.exports.get_ethabig = get_ethabig;