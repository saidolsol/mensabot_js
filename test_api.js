var request = require("request");
console.log("API-Key,Mensa");
for (i = 0; i < 999; i++) {
  (function test(key) {
    request({
        url: `https://zfv.ch/de/menus/rssMenuPlan?menuId=${key}&type=uzh2&dayOfWeek=3`
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          start =  body.indexOf("<title>");
          body = body.substring(start, body.length);
          end = body.indexOf("</title>");
          mensaname = body.substring(7, end);
          mensaname = mensaname.replace("Mensa Feed - ", "");
          console.log(`${key},"${mensaname}"`);
        }
      });
  })(i);
}