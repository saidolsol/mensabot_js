var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var botManager = require('./botManager.js');
var variables = require('./variables');
var botan = require('botanio')(variables.botan_token);

//Holt die Menüs der ETH- und Uni Mensen
function call_eth() {
    var get_ethabig = require('./get_ethabig');
    //URL für heute generieren
    var date = new Date();
    if ((date.getDay() === 6) || (date.getDay() === 0)) {
        return;
    }
    date = date.toISOString().split('T')[0];
    var url_lunch = 'https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/' + date + '/lunch';
    var url_dinner = 'https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/' + date + '/dinner';
    //call eth menu, which denn calls uni
    get_ethabig.get_ethabig(url_dinner, url_lunch);
    var get_gifs = require('./get_gifs');
    //fetch gifs for /pivo responses
    get_gifs.get_gifs("beer");
    //fetch gif urls for /nomnom:
    get_gifs.get_gifs("foodporn");
}

//Damit die Menüs bei jedem Programmstart aktualisiert werden
call_eth();

var token = variables['token'];

// Setup polling way
var bot = new TelegramBot(token, { polling: true });

//Das hier passiert sobald der Bot eine Nachricht bekommt:
bot.onText(/\/(.+)/, function (msg, match) {

    console.log('onText: ');
    botan.track(msg, match[1].split('@')[0]);
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

