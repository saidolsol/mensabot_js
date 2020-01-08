var help_msg = `*Verfügbare Mensen Zentrum:*
    Mensa Polyterasse: /poly 
    Food Trailer: /trailer 
    CLAusiusbar: /clausius
    food&lab: /foodlab
    Polysnack: /polysnack
    G-ESSbar: /gessbar
    Tannenbar: /tannenbar
    Dozentenfoyer: /dozentenfoyer
    Alumni quattro Lounge: /alumni
    Klara's Kitchen: /klaras
    Streetfood Zentrum: /streetzentrum
*Hönggerberg:*
    Fusion meal: /fusion
    Rice Up!: /riceup
    Food Market: /grill, /pizzapasta, /green
    Fusion Coffee /fusioncoffee
    Streetfood Hönggerberg: /streethoengg
*UZH Mensen:*
    untere Mensa a: /uniunten
    obere Mensa b: /unioben
    Lichthof: /lichthof
    Irchel: /irchel
    Tierspital: /tierspital
    Zentrum für Zahnmedizin: /zahnarzt
    Plattenstrasse: /platte
    Rämi 59 (vegan): /raemi
    Cafeteria Seerose: /seerose
    Cafeteria Atrium: /atrium
*Andere:*
    PH Zürich (HB): /ph
    Cafeteria Cityport: /cityport
    ZHDK Toni Areal: /zhdk
    Binzmühle: /binzmuehle
    Botanitscher Garten: /botanisch

*Abendmenüs gibt\'s ab 14:00 Uhr.*

*Verfügbare Öffnungszeiten:*\n_Mit Vorsicht zu genießen!_
    Äss-Bar: /aessbar
    Unipoint Döner: /unipoint
    Lemon Grass: /lemongrass
    coop Haldenbach: /coop
    Beers\'n\'More: /beersnmore
    Hot Pasta: /hotpasta
    Jimmy\'s Pizza: /jimmy
    Cafe und Beck Buchmann: /beck
    \n\n*Fragen oder Anregungen:*\n/feedback <Deine Nachricht>\n\n*Willst Du mithelfen?*\nSchau doch auf [GitHub](https://github.com/saidolsol/mensabot_js) vorbei :)`;    

var openingh = {
    "buchmann": '*Öffnungszeiten Buchmann Cafe und Beck:* \nMo-Fr: 07:00 bis 21:00 Uhr\nSa: 07:00 bis 17:00 Uhr\nSo: 08:00 bis 17:00 Uhr\n_Nur bargeldlose Zahlung!_',
    //"klaras": '*Öffnungszeiten Klara\'s Kitchen:* \nMo-Fr: 07:30 bis 16:30 Uhr',
    "hotpasta": '*Öffnungszeiten Hot Pasta:* \nMo-Fr: 11:00 bis 24:00 Uhr\nSa: geschlossen\nSonntags geschlossen',
    "beersnmore": '*Öffnungszeiten Beers\'n\'More:* \nMo-Do: 16:00 bis 21:30 Uhr\nFr: 16:00 bis 22:00 Uhr\nSa: 12:00 bis 22:00 Uhr\nSonntags geschlossen',
    "jimmy": "*Öffnungszeiten Restaurant Culmann:*\nMo-Sa: 11:00 - 14:30, 17:00 - 23:00 Uhr\nSonntags geschlossen",
    "coop": "*Öffnungszeiten coop Haldenbach:*\nMo-Sa: 07:30 bis 21:00 Uhr\nSonntags geschlossen",
    "lemongrass": "*Öffnungszeiten The Lemon Grass:*\nMo-Sa: 11:00 bis 15:30 Uhr\nAm Wochenende geschlossen",
    "unipoint": "*Öffnungszeiten Döner Unipoint:*\nMo-Fr: 09:30 bis 23:00 Uhr\nSa: geschlossen\nSo: 10:00 bis 22:00 Uhr",   
    "aessbar": "*Öffnungszeiten Äss-Bar*\nETH Zentrum: Mi & Do von ca. 9:00-15:00\nHönggerberg: Mo & Fr von ca. 9:00-15:00",
    "how": "Ich laufe auf Node.js auf einem Server vom SOSETH. Die Menüs lade ich mir jeden tag als JSON bei der ETH runter. Alles weitere gibt\'s auf [GitHub](https://github.com/saidolsol/mensabot_js).",
    "help": help_msg,
    "start": help_msg
};

module.exports = openingh;
