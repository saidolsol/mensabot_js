var request = require('request')
var fs = require('fs');

function get_all(){
    request({
        url: "http://mensazurich.ch:8080/api/de/all/getMensaForCurrentWeek",
        json: true
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync("./mensas.json", JSON.stringify(body));
            console.log("got all menus!");
            console.log(Object.keys(body));
        } else {
            console.error("could not get menus from rönes api, guet gmacht röne");
            console.log(error);
            fs.writeFileSync("mensas.json", "{}");
        }
    });
}

//get_all()
module.exports.get_all = get_all;
