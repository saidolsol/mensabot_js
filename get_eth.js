var request = require('request')
var fs = require('fs');


function get_eth(url) {

    request(
        {
            url: url,
            json: true
        }, function (error, response, body) {
            console.log(error);
            console.log(response);

            fs.writeFileSync("mensas.json", "{");

            var to_write = "";
            //console.log(body);
            //irgendwas mit dem json machen:
            console.log(body[0])
            var l = body.length;
            for (var i = 0; i < l - 1; i++) {
                to_write = "\"" + body[i].mensa + "\":" + JSON.stringify(body[i]) + ",";
                fs.appendFileSync("mensas.json", to_write);
            }
            fs.appendFileSync("mensas.json", "\"" + body[l - 1].mensa + "\":" + JSON.stringify(body[l - 1]) + "}");
            //var get_uni = require('./get_uni');
            //get_uni.get_uni();

        });
};

module.exports.get_eth = get_eth;