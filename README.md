# [@zurimensen_bot](http://t.me/zurimensen_bot) - Mensabot Zürich by saidolsol and gingeneer

This is a german speaking chat bot for the messenger app [Telegram](https://telegram.org). It was created to provide users with menus of all cafeterias on the ETH and UZH campuses in Zürich. Although this does work well for ETH cafeterias, it turned out to be a little more difficult for the UZH cafeterias. We got it working with UZH mensas, but it just parses the HTML of the UZH website, so it will break if they change anything on the site.

### What it does

Currently, the bot can do the following:
* Provide the daily menu for all ETH and UZH cafeterias
* Provide opening hours for different businesses around the ETH campuses City and Hönggerberg
* Collect feedback and allow us to reply to it

A list of all commands for the general user is saved in the [commands.txt](https://github.com/saidolsol/mensabot_js/blob/master/commands.txt) file. This file is used to set the commands with the BotFather. Some commands you may find in the code are not intended for public usage and therefore not listed here.

### How it does it

The bot is divided into three main parts. There is the botManager, that takes care of the message and gives the appropriate response. Then there are the get-functions, that provide the menus and finally there's the mensabot.js file, which puts all the pieces together.

In order to get the menus for the ETH cafeterias, the bot uses a JSON containing all relevant information put online by the ETH itself [(example lunch menu, 2016-06-06)](https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/2016-06-06/lunch). 

For the cafeterias of the UZH, we parse the HTML of the unis website, which is not a good solution, since it can break really fast if they chage anything. The alternative would be to get the data from the PDF file which the uni provides, but that seamed even more difficult than parsing the website (not to mention it can break just as fast).

If a cafeteria also offers dinner, the displayed menu changes at 14:00. The menus of the other cafeterias remain unchanged. 

We set up a cronjob to restart the program every night to update the JSONs.

The opening hours are saved as a string in an object and have to be edited manually. Therefore, they are not always up to date.

If a user is asking for a menu, which the bot cannot provide (for example on weekends or holidays or because someone from the cafeteria messed up), she or he will receive a message explaining.

### The infrastructure

We're hosting the bot on a VM (Ubuntu) provided by the [SOSETH](http://sos.ethz.ch/ressorts/vsos/), a student's organization at the ETH.

### The future

Functions we would like to add:
* Filling level of the vending machine in the student's lounge (no idea how to realize this)
* Enable users to receive their fovourite cafeteria's menu automatically every day at a certain time
* A way of rating menus afterwards, so other users can decide where to eat based on those ratings
* ~~A nicer way to deal with weekends and other instances, when cafeterias don't provide a menu~~

### Why

Procrastination.

And it does indeed help to figure out where to get lunch.

### Libraries

* [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
* [fs](https://nodejs.org/api/fs.html)

### Press

Due to its outstanding contribution to the quality of campus life, the bot was featured in the renowned students magazine "[Blitz](https://www.blitz.ethz.ch/)" (issue nr. 2 "Dreiecke", autumn 2017).
