var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var botManager = require('./botManager.js');
var variables = require('./variables');

function log_csv(msg, match){
    if (!fs.existsSync("./stats.csv")){
        fs.writeFileSync("./stats.csv", "user,request,time,is_groupchat" + "\n");
    }
    var moment = require('moment');
    var date_string = moment.unix(msg.date).format("YYYY-MM-DD");
    var stats = msg.from.id + ',"' + match[1].split('@')[0] + '",' + date_string + ',';
    if (msg.chat.type === "group") stats += "true";
    else stats += "false";

    fs.appendFileSync("./stats.csv", stats + "\n");
}

//Damit die Menüs bei jedem Programmstart aktualisiert werden
var get_all = require('./get_all');
get_all.get_all();

var token = variables['token'];

// Setup polling way
var bot = new TelegramBot(token, { polling: true });

//Das hier passiert sobald der Bot eine Nachricht bekommt:
bot.onText(/\/(.+)/, function (msg, match) {

    // console.log('onText: ');

    log_csv(msg, match);
    var messageToSend = botManager.processOnText(msg, match);

    //console.log(messageToSend);
    if (messageToSend == undefined) return;
    for (var i = 0; i < messageToSend.length; i++) {

        var message = messageToSend[i];

        console.log(message);
        if (message.type === "text") {
            bot.sendMessage(message.chatId, message.message, message.options).then(function (message) {
                console.log('Message sent');
                i++;
            }, function (error) {
                console.log('Error: ' + error);

                // it happens that the message fails because of an invalid markdown, so just send it again as normal text (yse it is ugly)
                bot.sendMessage(message.chatId, message.message).then(function (message) {
                    console.log('Message sent without markdown');
                }, function (error) {
                    console.log('Failed even without markdown. Error: ' + error);
                });
                i++;
            });
        }
        // no longer used
        else if (message.type === "video") {
            bot.sendVideo(message.chatId, message.message).then(function (message) {
                console.log('Message sent');
                i++;
            }, function (error) {
                console.log('Error: ' + error);
                i++;
            });
        }

    }
});

