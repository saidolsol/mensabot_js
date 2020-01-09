var fs = require('fs');
var separator = '############################################################################\n';
var respId = 0;
var variables = require('./variables');
var feedback_chatId = variables['feedback_chatId'];
const mensas = require('./mensas.json')
const openingh = require('./openingh');

//Translates the simple command to the often more complex name of the cafeteria in the JSON file
const dict = {
    "foodlab":"food&lab",
    "beck": "buchmann",
    "cliff": "Clausiusbar",
    "haoyi": "Woka",
    "poly": "Mensa Polyterrasse",
    "polysnack": "Polysnack",
    "gessbar": "G-ESSbar",
    "alumni": "Alumni quattro Lounge",
    "bellavista": "BELLAVISTA",
    "riceup": "Rice Up!",
    "clausiusbar": "Clausiusbar",
    "clausius": "Clausiusbar",
    "asia": "Clausiusbar",
    "fusion": "FUSION meal",
    "tannenbar": "Tannenbar",
    "trailer": "Foodtrailer ETZ",
    "dozentenfoyer": "Dozentenfoyer",
    "grill": "food market - grill bbQ",
    "pizzapasta": "food market - pizza pasta",
    "green": "food market - green day",
    'uniunten': 'Untere Mensa A',
    'unia': 'Untere Mensa A',
    'unioben': 'Obere Mensa B',
    'unib': 'Obere Mensa B',
    'lichthof': 'Lichthof',
    'irchel': 'Irchel',
    'zahnarzt': 'Zentrum Für Zahnmedizin',
    'tierspital': 'Tierspital',
    'platte': 'Platte',
    'raemi': "Rämi 59 (vegan)",
    'zhdk': 'ZHDK Toni-Areal',
    'uni': "Obere Mensa B",
    'binzmuehle': "Binzmühle",
    'botanisch': "Botanischer Garten",
    'atrium': "Cafeteria Atrium",
    'cityport': "Cafeteria Cityport",
    'seerose': "Cafeteria Seerose",
    'fusioncoffee': "FUSION coffee",
    'klaras': "Klaras Kitchen",
    'ph': "PH Zürich (HB)",
    'streetzentrum': "Streetfood Zentrum",
    'streethoengg': "Streetfood Höngg"
};

function responseText(command, sentCommand) {
    if (command in openingh) {
        return openingh[command];
    }
    //Mensa
    else if (command in mensas) {
        var date = new Date();
        var isdinner = false;
        var dinnerstring = " _Mittag_";
        if (date.getHours() >= 14) {
            isdinner = true;
            if (sentCommand === 'uni'){
                command = 'Untere Mensa A';
            }
        }    
        date.setHours(date.getHours() + 3);
        const datestring = date.toISOString().split('T')[0];
        var menus = {}
        if (Object.keys(mensas[command].weekdays).length === 0){
            return "Diese Mensa hat heute kein Menu zur Verfügung gestellt. 😢\n" +
            "Oder der mensabot ist wiedermal kaputt...\n" +
            "/help für andere Verpflegungsmöglichkeiten";
        }
        if (mensas[command].weekdays[datestring].mealTypes.all_day){
            menus = mensas[command].weekdays[datestring].mealTypes.all_day
            var dinnerstring = " _All Day_";
        }
        if (mensas[command].weekdays[datestring].mealTypes.lunch){
            menus = mensas[command].weekdays[datestring].mealTypes.lunch
            var dinnerstring = " _Mittag_";
        }
        if (isdinner) {
            if (mensas[command].weekdays[datestring].mealTypes.dinner){
                menus = mensas[command].weekdays[datestring].mealTypes.dinner
                dinnerstring = " _Abend_"
            }
        }
        if (Object.keys(menus).length === 0){
            return "Diese Mensa hat heute kein Menu zur Verfügung gestellt. 😢\n" +
            "Oder der mensabot ist wiedermal kaputt...\n" +
            "/help für andere Verpflegungsmöglichkeiten";
        }
        if (menus.hours.from != null || menus.hours.to != null) {
            resp = `*${mensas[command].name}*  _${menus.hours.from}-${menus.hours.to}_`;
        }
        else {
            resp = `*${mensas[command].name}* ${dinnerstring}`;
        }
        
        for (const meal of menus.menus){
            prices = "_(";
            for (const price in meal.prices){
                if(meal.prices.hasOwnProperty(price)){
                    prices += `${meal.prices[price]}/`;
                }
            }
            // remove last '/'
            prices = prices.slice(0, -1);
            prices += ")_";
            if (prices === "_)_") {
                prices = "";
            }
            if (meal.name.includes("News")) {
                description = "";
                for (var i = 0; i < meal.description.length; i++) {
                    if (meal.description[i].trim() !== "") {
                        description += `${meal.description[i].trim()} `;
                        if (i === 0) {description += "\n"}
                    }
                }
                resp += `\n\n*${meal.name}*:   ${prices}\n${description}`;
            }
            else {
                description = "";
                for (var i = 0; i < meal.description.length; i++) {
                    if (meal.description[i].trim() !== "") {
                        if (i === 0) {description += "*"}
                        description += `${meal.description[i].trim()} `;
                        if (i === 0) {description += "*"}
                        if (i === 0 && meal.description.length > 1) {description += "\n"}
                    }
                }

                resp += `\n\n${meal.name}:  ${prices}\n${description}`;
                }
            
        }
        return resp;

    } else if (sentCommand in dict) {
        //mensa sollte vorhanden sein, ist aber nicht im json
        return "Diese Mensa hat heute kein Menu zur Verfügung gestellt. 😢\n" +
        "Oder der mensabot ist wiedermal kaputt...\n" +
        "/help für andere Verpflegungsmöglichkeiten";
    } else {
        return "Ungültige mensa, siehe /help";
    }
}

function processOnText(msg, match) {
    var resp = "";
    var timestamp = new Date();
    var messagesToSend = [];
    var chatId = msg.chat.id;
    var respType = "text";
    //console.log(msg);

    //Feedback
    if (match[0].indexOf('/feedback') != -1 || match[0].indexOf('/respond') != -1) {
        var authorized = ["gingeneer", "saidolsol"];
        if (match[0] === '/feedback' || match[0] === '/feedback@zurimensen_bot') {
            resp = '*Feedback für Dummies:*\n/feedback <Deine Nachricht>';

        } else if (match[0].indexOf('/feedback') != -1) {
            respId = chatId;
            fs.appendFile('logs/feedback.log', separator + '\n\n' + timestamp + '\n\n' + JSON.stringify(msg) + '\n\n', function (err) {
                console.log(err);
            });
            resp = 'Vielen Dank für Dein Feedback!';

            messagesToSend.push({
                chatId: feedback_chatId,
                type: "text",
                message: 'New feedback:\n\n' + JSON.stringify(msg, null, 4)
            });
            fs.writeFileSync("./respId.txt", respId.toString());
        }
        //respond to feedback:
        else if (match[0].indexOf('/respondid') != -1 && authorized.indexOf(msg.from.username) != -1) {
            str = match[0].split('respondid')[1].split(':');
            resp = str[1];
            chatId = parseInt(str[0]);
        } else if (match[0].indexOf('/respond') != -1 && authorized.indexOf(msg.from.username) != -1) {

            resp = match[0].split('respond');
            resp = resp[1];
            respId = fs.readFileSync("./respId.txt", "utf8");
            chatId = parseInt(respId);
        }
    } else {
        //Chopping '@...' from the command if needed
        var command = match[1].split('@');
        command = command[0];
        console.log(command);
        var sentCommand = command;
        //Nicht ideal weil ja nicht ein Strang, aber funktioniert so weit ganz gut (denke ich):
        //Checking whether a cafeteria has dinner and if its late enough to display the dinner menu
        if (command in dict) {
            command = dict[command];
        }
        resp = responseText(command, sentCommand);
    }

    //sometimes they have ` in their menu, replace it with ' (breaks markdown)
    //if (respType === "text") resp = resp.replace(/`/g, '\'');

    messagesToSend.push({
        chatId: chatId,
        message: resp,
        options: {
            parse_mode: 'Markdown'
        },
        type: respType
    });

    fs.appendFile('logs/handled_requests.log', separator + timestamp + '\n\n' + JSON.stringify(msg, null, 2) + '\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\nRESPONSE:\n\n' + resp + '\n', function (err) {
        console.log(err);
    });

    return messagesToSend;
}
module.exports.processOnText = processOnText;
