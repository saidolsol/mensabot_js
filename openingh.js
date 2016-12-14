var help_msg = '*Verfügbare Mensen*:\n\
    Mensa Polyterasse: /poly \n\
    Food Trailer: /trailer \n\
    CLAusiusbar: /asia\n\
    Fusionmensa: /fusion \n\
    FoodLAB: /foodlab\n\
    Woka: /woka\n\
    Polysnack: /polysnack\n\
    G-ESSbar: /gessbar\n\
    Tannenbar: /tannenbar\n\
    Food Market: /grill, /pizzapasta, /green\n\
    Dozentenfoyer: /dozentenfoyer\n\
    Alumni quattro Lounge: /alumni\n\
    UZH untere Mensa a: /uniunten\n\
    UZH obere Mensa b: /unioben\n\
    UZH Lichthof: /lichthof\n\
    UZH Irchel: /irchel\n\
    UZH Tierspital: /tierspital\n\
    UZH Zahnmedizin: /zahnarzt\n\
    UZH Plattenstrasse: /platte\n\
    UZH Rämi 59 (vegan): /raemi\n\n\
    Abendmenüs gibt\'s ab 14:00 Uhr.\n\n*Verfügbare Öffnungszeiten:*\n_Mit Vorsicht zu genießen!_\n\
    Klara\'s Kitchen: /klaras \n\
    Unipoint Döner: /unipoint\n\
    coop Haldenbach: /coop\n\
    Beers\'n\'More: /beersnmore\n\
    Hot Pasta: /hotpasta\n\
    Jimmy\'s Pizza: /jimmy\n\
    Curry Corner: /cc  \
    \n\n*Fragen oder Anregungen:*\n/feedback <Deine Nachricht>\n\n*Willst Du mithelfen?*\nSchau doch auf [GitHub](https://github.com/saidolsol/mensabot_js) vorbei :)';

var openingh ={
            "klaras":'*Öffnungszeiten Klara\'s Kitchen:* \nMo-Fr: 07:30 bis 16:30 Uhr\nSamstags und Sonntags geschlossen',
            "hotpasta":'*Öffnungszeiten Hot Pasta:* \nMo-Fr: 08:00 bis 24:00 Uhr\nSa: 11:00 bis 17:00 Uhr\nSonntags geschlossen',
            "beersnmore":'*Öffnungszeiten Beers\'n\'More:* \nMo-Do: 16:00 bis 21:30 Uhr\nFr: 16:00 bis 22:00 Uhr\nSa: 12:00 bis 22:00 Uhr\nSonntags geschlossen',
            "jimmy" : "*Öffnungszeiten Jimmy\'s Pizza:*\nMo-Sa: 17:00 bis 23:30 Uhr\nSonntags geschlossen",
            "cc" : "*Öffnungszeiten Curry Corner:*\nMo-Fr: 11:15 bis 14:00 Uhr",
            "coop": "*Öffnungszeiten coop Haldenbach:*\nMo-Sa: 07:30 bis 21:00 Uhr\nSonntags geschlossen",
            "unipoint": "*Öffnungszeiten Döner Unipoint:*\nMo-Fr: 08:30 bis 23:30 Uhr\nSa-So: 10:30 bis 22:00 Uhr",
            "how" : "Ich laufe auf Node.js auf einem Server vom SOSETH. Die Menüs lade ich mir jeden tag als JSON bei der ETH runter. Alles weitere gibt\'s auf [GitHub](https://github.com/saidolsol/mensabot_js).",
            "help" : help_msg,
            "start" : help_msg
        };

module.exports = openingh;
