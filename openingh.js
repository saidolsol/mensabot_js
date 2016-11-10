var help_msg = '*Verfügbare Mensen*:\nMensa Polyterasse: /poly \nFood Trailer: /trailer \nCLAusiusbar: /asia\nFusionmensa: /fusion \nFoodLAB: /foodlab\nWoka: /woka\nTannenbar: /tannenbar\nFood Market: /grill, /pizzapasta, /green\nDozentenfoyer: /dozentenfoyer\nUZH untere Mensa a: /uniunten\nUZH obere Mensa b: /unioben\nUZH Lichthof: /lichthof\nUZH Irchel: /irchel\nUZH Tierspital: /tierspital\nUZH Zahnmedizin: /zahnarzt\nUZH Plattenstrasse: /platte\nUZH Rämi 59 (vegan): /raemi\n\nAbendmenüs gibt\'s ab 14:00 Uhr.\n\n*Verfügbare Öffnungszeiten:*\n_Mit Vorsicht zu genießen!_\nKlara\'s Kitchen: /klaras \nBeers\'n\'More: /beersnmore\nHot Pasta: /hotpasta\nJimmy\'s Pizza: /jimmy\nCurry Corner: /cc  \n\n*Fragen oder Anregungen:*\n/feedback <Deine Nachricht>\n\n*Willst Du mithelfen?*\nSchau doch auf [GitHub](https://github.com/saidolsol/mensabot_js) vorbei :)';

var openingh ={
            "klaras":'*Öffnungszeiten Klara\'s Kitchen:* \nMo-Fr: 07:30 bis 16:30 Uhr\nSamstags und Sonntags geschlossen',
            "hotpasta":'*Öffnungszeiten Hot Pasta:* \nMo-Fr: 08:00 bis 24:00 Uhr\nSa: 11:00 bis 17:00 Uhr\nSonntags geschlossen',
            "beersnmore":'*Öffnungszeiten Beers\'n\'More:* \nMo-Do: 16:00 bis 21:30 Uhr\nFr: 16:00 bis 22:00 Uhr\nSa: 12:00 bis 22:00 Uhr\nSonntags geschlossen',
            "jimmy" : "*Öffnungszeiten Jimmy\'s Pizza:*\nMo-Sa: 17:00 bis 23:30 Uhr\nSonntags geschlossen",
            "cc" : "*Öffnungszeiten Curry Corner:*\nMo-Fr: 11:15 bis 14:00 Uhr",
            "how" : "Ich laufe auf Node.js auf einem Server vom SOSETH. Die Menüs lade ich mir jeden tag als JSON bei der ETH runter. Alles weitere gibt\'s auf [GitHub](https://github.com/saidolsol/mensabot_js).",
            "help" : help_msg,
            "start" : help_msg
        };

module.exports = openingh;
