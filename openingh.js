var help_msg = '*Verfügbare Mensen Zentrum:*\n\
    Mensa Polyterasse: /poly \n\
    Food Trailer: /trailer \n\
    CLAusiusbar: /clausius\n\
    Polysnack: /polysnack\n\
    G-ESSbar: /gessbar\n\
    Tannenbar: /tannenbar\n\
    Dozentenfoyer: /dozentenfoyer\n\
    Alumni quattro Lounge: /alumni\n\
*Hönggerberg:*\n\
    Fusionmensa: /fusion\n\
    Rice Up!: /riceup\n\
    Food Market: /grill, /pizzapasta, /green\n\
*UZH Mensen:*\n\
    UZH untere Mensa a: /uniunten\n\
    UZH obere Mensa b: /unioben\n\
    UZH Lichthof: /lichthof\n\
    UZH Irchel: /irchel\n\
    UZH Tierspital: /tierspital\n\
    UZH Zahnmedizin: /zahnarzt\n\
    UZH Plattenstrasse: /platte\n\
    UZH Rämi 59 (vegan): /raemi\n\n\
    Abendmenüs gibt\'s ab 14:00 Uhr.\n\n\
*Verfügbare Öffnungszeiten:*\n_Mit Vorsicht zu genießen!_\n\
    Klara\'s Kitchen: /klaras \n\
    Unipoint Döner: /unipoint\n\
    Lemon Grass: /lemongrass\n\
    coop Haldenbach: /coop\n\
    Beers\'n\'More: /beersnmore\n\
    Hot Pasta: /hotpasta\n\
    Jimmy\'s Pizza: /jimmy\n\
    Cafe und Beck Buchmann: /beck\n\
    \n\n*Fragen oder Anregungen:*\n/feedback <Deine Nachricht>\n\n*Willst Du mithelfen?*\nSchau doch auf [GitHub](https://github.com/saidolsol/mensabot_js) vorbei :)';    

var openingh = {
    "buchmann": '*Öffnungszeiten Buchmann Cafe und Beck:* \nMo-Fr: 07:00 bis 21:00 Uhr\nSa: 07:00 bis 17:00 Uhr\nSo: 08:00 bis 17:00 Uhr\n_Nur bargeldlose Zahlung!_',
    "klaras": '*Öffnungszeiten Klara\'s Kitchen:* \nMo-Fr: 07:30 bis 16:30 Uhr',
    "hotpasta": '*Öffnungszeiten Hot Pasta:* \nMo-Fr: 08:00 bis 24:00 Uhr\nSa: 11:00 bis 17:00 Uhr\nSonntags geschlossen',
    "beersnmore": '*Öffnungszeiten Beers\'n\'More:* \nMo-Do: 16:00 bis 21:30 Uhr\nFr: 16:00 bis 22:00 Uhr\nSa: 12:00 bis 22:00 Uhr\nSonntags geschlossen',
    "jimmy": "*Öffnungszeiten Jimmy\'s Pizza:*\nMo-Sa: 17:00 bis 23:30 Uhr\nSonntags geschlossen",
    "coop": "*Öffnungszeiten coop Haldenbach:*\nMo-Sa: 07:30 bis 21:00 Uhr\nSonntags geschlossen",
    "lemongrass": "*Öffnungszeiten The Lemon Grass:*\nMo-Sa: 11:00 bis 15:30 Uhr\nAm Wochenende geschlossen",
    "unipoint": "*Öffnungszeiten Döner Unipoint:*\nMo-Fr: 08:30 bis 23:30 Uhr\nSa-So: 10:30 bis 22:00 Uhr",   
    "how": "Ich laufe auf Node.js auf einem Server vom SOSETH. Die Menüs lade ich mir jeden tag als JSON bei der ETH runter. Alles weitere gibt\'s auf [GitHub](https://github.com/saidolsol/mensabot_js).",
    "help": help_msg,
    "start": help_msg
};

module.exports = openingh;
