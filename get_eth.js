var request = require('request')
var fs = require('fs');


function get_eth(url) {

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            fs.writeFileSync("mensas.json", "{");
            if (body.length != 0) {
                var to_write = "";
                //console.log(body);
                //irgendwas mit dem json machen:
                var l = body.length;
                for (var i = 0; i < l - 1; i++) {
                    to_write = "\"" + body[i].mensa + "\":" + JSON.stringify(body[i]) + ",";
                    fs.appendFileSync("mensas.json", to_write);
                }
                fs.appendFileSync("mensas.json", "\"" + body[l - 1].mensa + "\":" + JSON.stringify(body[l - 1]) + "}");
                console.log("succesfully got eth lunch");
            } else {
                console.warn("empty menu received");
                fs.appendFileSync("mensas.json", "}");
            }
        } else {
            console.error("could not get eth lunch menu from internet");
            console.log(error);
            fs.writeFileSync("mensas.json", "{}");
        }
        var get_uni = require('./get_uni_api');
        get_uni.get_uni();

    });
}

module.exports.get_eth = get_eth;