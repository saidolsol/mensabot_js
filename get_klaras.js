var fs = require('fs');
var request = require('request');
var variables = require('./variables');
var mensaApi = require("./mensazhApi");

function get_klaras() {
    if(variables.useFacebookApi) {
        var url = "https://graph.facebook.com/v2.10/349142741957809/feed?access_token=" + variables.fb_token;
        request({url: url, json: true}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("got something from fb!");
                var output = [];
                for (var i = 0; i < body.data.length; i++) {
                    if (body.data[i].message) {
                        output.push(body.data[i]);
                    }

                }
                fs.writeFileSync("klaras.json", JSON.stringify(output));
            } else {
                console.error("Error getting klaras menu from fb");
                console.error(error);
            }
        });
    } else {
        mensaApi.getMenusForDefaultParams("Klaras Kitchen","others", answer => {
            fs.writeFileSync("klaras.json", JSON.stringify(answer));
        })
    }
}
module.exports.get_klaras = get_klaras;