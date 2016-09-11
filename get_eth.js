var request = require('request')
var fs = require('fs');


function get_eth(url){

    request(
        {
            url: url,
            json: true
        }, function (error, response, body){
            console.log(error);
            console.log(response);
            
            fs.writeFile("mensas.json","{" ,function(err){
                    if(err) {
                        return console.log(err);
                    }
            });

            var to_write = ""; 
            //console.log(body);
            //irgendwas mit dem json machen:
            console.log(body[0])
            var l = body.length;
            for (var i = 0; i < l-1; i++) {
                to_write = "\"" + body[i].mensa + "\":"+JSON.stringify(body[i]) + ",";
                fs.appendFile("mensas.json",to_write ,function(err){
                    if(err) {
                        return console.log(err);
                    }
                });
            }
            fs.appendFile("mensas.json", "\"" + body[l-1].mensa + "\":"+JSON.stringify(body[l-1]) + "}",function(err){
                    if(err) {
                        return console.log(err);
                    }
                });

        });
};
module.exports.get_eth = get_eth;