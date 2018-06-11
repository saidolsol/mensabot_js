var fs = require('fs');
var separator = '############################################################################\n';
var respId = 0;
var variables = require('./variables');
var feedback_chatId = variables['feedback_chatId'];

function processOnText(msg, match) {
    var resp = "";
    var timestamp = new Date();
    var messagesToSend = [];
    var openingh = require('./openingh');
    var chatId = msg.chat.id;
    var respType = "text";
    //console.log(msg);

    //Cafeterias serving dinner
    var dinner_dict = {
        "poly": "Mensa Polyterrasse",
        "pizzapasta": "food market - pizza pasta",
        "green": "food market - green day",
        "grill": 'food market - grill bbQ',
        "fusion": "FUSION coffee",
        "irchel": "UZH Irchel (abend)",
        "uniunten": "UZH untere Mensa A (abend)",
        "unia": "UZH untere Mensa A (abend)",
        "uni": "UZH untere Mensa A (abend)"
    }

    //Translates the simple command to the often more complex name of the cafeteria in the JSON file
    var dict = {
        "beck": "buchmann",
        "cliff": "Clausiusbar",
        "haoyi": "Woka",
        "poly": "Mensa Polyterrasse",
        "polysnack": "Polysnack",
        "gessbar": "G-ESSbar",
        "alumni": "Alumni quattro Lounge",
        "bellavista": "BELLAVISTA",
        "foodlab": "foodLAB",
        "clausiusbar": "Clausiusbar",
        "clausius": "Clausiusbar",
        "asia": "Clausiusbar",
        "fusion": "FUSION meal",
        "woka": "Woka",
        "tannenbar": "Tannenbar",
        "trailer": "Foodtrailer ETZ",
        "dozentenfoyer": "Dozentenfoyer",
        "grill": "food market - grill bbQ",
        "pizzapasta": "food market - pizza pasta",
        "green": "food market - green day",
        'uniunten': 'UZH untere Mensa A',
        'unia': 'UZH untere Mensa A',
        'unioben': 'UZH obere Mensa B',
        'unib': 'UZH obere Mensa B',
        'lichthof': 'UZH Lichthof',
        'irchel': 'UZH Irchel',
        'zahnarzt': 'UZH Zentrum Für Zahnmedizin',
        'tierspital': 'UZH Tierspital',
        'platte': 'UZH Platte',
        'raemi': 'UZH Rämi 59 (vegi)',
        'zhdk': 'ZHDK Toni-Areal',
        'uni': "UZH obere Mensa B"
    };

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
        }
        //respond to feedback:
        else if (match[0].indexOf('/respondid') != -1 && authorized.indexOf(msg.from.username) != -1) {
            str = match[0].split('respondid')[1].split(':');
            resp = str[1];
            chatId = parseInt(str[0]);
        } else if (match[0].indexOf('/respond') != -1 && authorized.indexOf(msg.from.username) != -1) {

            resp = match[0].split('respond');
            resp = resp[1];

            chatId = respId;
        }
    } else {
        //Chopping '@...' from the command if needed
        var command = match[1].split('@');
        command = command[0];
        console.log(command);
        var sentCommand = command;
        var mensas = {}
        //Nicht ideal weil ja nicht ein Strang, aber funktioniert so weit ganz gut (denke ich):
        //Checking whether a cafeteria has dinner and if its late enough to display the dinner menu
        if (command in dinner_dict && timestamp.getHours() >= 14) {
            command = dinner_dict[command];
            mensas = require('./mensas_abig.json');
            var t = 1;
            //Checking whether its a known cafeteria
        } else if (command in dict) {
            command = dict[command];
            mensas = require('./mensas.json');
            var t = 0;
            //...help/start, opening hours
        }

        if (command in openingh) {
            resp = openingh[command];
            if (command === "klaras") {
                var menu = require('./klaras.json');
                if (menu && menu.length > 0) {
                    resp += "\n*facebook feed:*";
                    for (var i = 0; i < 3; i++) {
                        var date = new Date(menu[i].created_time);
                        resp += "\n_" + date.toDateString() + ", " + date.getHours() + ':' + date.getMinutes() + "_\n";
                        resp += menu[i].message.replace(/\n/g, ' ') + "\n";
                    }
                }
            }

        }
        //Mensa
        else if (command in mensas) {

            resp = "*" + command + "*\n";
            if (mensas[command].hours.mealtime[t] && !mensas[command].hours.mealtime[t]['hardcoded']) {
                resp += "_Essen von " + mensas[command].hours.mealtime[t]["from"] + " bis " + mensas[command].hours.mealtime[t]["to"] + " Uhr_\n\n";
            } else {
                resp += "\n";
            }
            if (mensas[command].hours.closed_due) {
                resp += "*wegen " + mensas[command].hours.closed_due + " geschlossen!*\n\n";
            }


            for (var meal in mensas[command]["meals"]) {
                var description = "";
                for (i in mensas[command]["meals"][meal]["description"]) {
                    description += mensas[command]["meals"][meal]["description"][i] + " ";
                    if (i === "0" && mensas[command]["meals"][meal]["description"].length > 1) {
                        description += "\n";
                    }
                }
                if (mensas[command]['meals'][meal]['prices']['student'] == undefined) {
                    resp += "*" + mensas[command]["meals"][meal]["label"] + ":*\n" + description.replace("*", "(star)") + "\n";
                } else {
                    resp += "*" + mensas[command]["meals"][meal]["label"] + " (" + mensas[command]["meals"][meal]["prices"]["student"] + "/" + mensas[command]["meals"][meal]["prices"]["staff"] + "/" + mensas[command]["meals"][meal]["prices"]["extern"] + "):*\n" + description.replace("*", "(star)") + "\n";
                }

            }
        } else if (command === "svensh") {
            try {
                var svenshMenu = JSON.parse(fs.readFileSync('./svensh.json', 'utf8'));
                if (new Date(svenshMenu.updated).toDateString() == new Date().toDateString() && svenshMenu.menu != '') {
                    //zum am david per zuefall (10%) e freud mache
                    if (Math.random() < 0.1) {
                        resp = "*svenshboob's Kitchen:*\n" + svenshMenu.menu;
                    } else {
                        resp = "*svenshbob's Kitchen:*\n" + svenshMenu.menu;
                    }
                } else {
                    resp = "No svensh menu today 😢";
                }
            } catch (err) {
                resp = "No svensh menu today 😢";
            }

        } else if (command.includes("setsvensh") && msg.from.username === "svenshbob") {
            var svenshMenu = {};
            svenshMenu['menu'] = msg.text.replace('/setsvensh', '').trim();
            svenshMenu['updated'] = new Date().toJSON();
            fs.writeFileSync("./svensh.json", JSON.stringify(svenshMenu));
            resp = "Svensh Menu updated to: " + svenshMenu.menu;

        } else if (sentCommand in dict) {
            //mensa sollte vorhanden sein, ist aber nicht im json
            resp = "Diese Mensa hat kein Menu zur Verfügung gestellt, vermutlich ist sie heute geschlossen. 😢"
        } else {
            return;
        }
    }

    //dirty hack to remove ` in file because of errors with Markdown
    //sometimes they have ` in their menu, replace it with '
    if (respType === "text") resp = resp.replace(/`/g, '\'');

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