// get gif urls for a keyword from gfycat, save them to a json file with the keyword in the name

var fs = require('fs');
var request = require('request');

function get_gifs(title) {
    var url = "https://api.gfycat.com/v1test/gfycats/search?search_text=" + title + "&count=100";
    request({ url: url, json: true }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var gif_urls = [];
            var l = body.gfycats.length;
            for(i = 0; i < l; i++){
                gif_urls.push(body.gfycats[i].gifUrl);
            }
            fs.writeFileSync(title + "_gifs.json", JSON.stringify(gif_urls));
            console.log("got " + title + " gif urls");
        }
        else {
            console.error("could not get " + title + " gifs from internet");
            console.log(error);
        }
    });
}

module.exports.get_gifs = get_gifs;
