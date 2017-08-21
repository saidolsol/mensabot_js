var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var botManager = require('./botManager.js');
var variables = require('./variables');

//Holt die Menüs der ETH- und Uni Mensen
function call_menus() {
    var get_ethabig = require('./get_ethabig');
    //URL für heute generieren
    var date = new Date();
    date = date.toISOString().split('T')[0];
    var url_lunch = 'https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/' + date + '/lunch';
    var url_dinner = 'https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/' + date + '/dinner';
    //call eth menu, which denn calls uni
    get_ethabig.get_ethabig(url_dinner, url_lunch);
    var get_klaras = require('./get_klaras');
    get_klaras.get_klaras();
}

//Damit die Menüs bei jedem Programmstart aktualisiert werden
call_menus();

var token = variables['token'];

// Setup polling way
var bot = new TelegramBot(token, { polling: true });

//Das hier passiert sobald der Bot eine Nachricht bekommt:
bot.onText(/\/(.+)/, function (msg, match) {

    console.log('onText: ');
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

