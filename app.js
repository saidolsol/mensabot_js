var TelegramBot = require('node-telegram-bot-api'); 
var fs = require('fs');
var botManager = require('./botManager.js');
var variables = require('./variables');

//Holt die Menüs der ETH-Mensen
function call_eth(){
    // var get_eth = require('./get_eth');
    var get_ethabig = require('./get_ethabig');
    // var get_uni = require('./get_uni');
    //URL für heute generieren
    var date =  new Date();
    if ((date.getDay() === 6) || (date.getDay() === 0)){
        return;
    }
    date = date.toISOString().split('T')[0];
    var url_lunch = 'https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/'+date+'/lunch';
    var url_dinner = 'https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/'+date+'/dinner';
    //get_eth aufrufen
    get_ethabig.get_ethabig(url_dinner, url_lunch);
    console.log('got eth dinner');
    // get_eth.get_eth(url_lunch);
    // console.log('got eth');
    // get_uni.get_uni();
    // console.log('got uni');
}

//Damit die Menüs bei jedem Programmstart aktualisiert werden
call_eth();

var token = variables['token'];

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

//Das hier passiert sobald der Bot eine Nachricht bekommt:
bot.onText(/\/(.+)/, function (msg, match) {

    console.log('onText: ');
    var messageToSend = botManager.processOnText(msg, match);
    
    console.log(messageToSend);
    
    for(var i=0;i<messageToSend.length;i++) {
        
        var message = messageToSend[i];

        
        console.log(message);
        
        bot.sendMessage(message.chatId, message.message, message.options).then(function(message) {
            console.log('Message sent');
            i++;
        }, function(error) {
            console.log('Error: ' + error);
            i++;
        });
    }
});

