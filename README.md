# @zurimensen_bot - Mensabot Zürich by saidolsol and gingeneer

This is a german speaking chat bot for the messenger app [Telegram](https://telegram.org). It was created to provide users with menus of all cafeterias on the ETH and UZH campuses in Zürich. Although this does work well for ETH cafeterias, it turned out to be a little more difficult for the UZH cafeterias. We got it working with UZH mensas, but it just parses the HTML of the UZH website, so it will break if they change anything on the site.

### What it does

Currently, the bot can do the following:
* Provide the daily menu for all ETH and UZH cafeterias
* Provide opening hours for different businesses around the ETH campuses City and Hönggerberg
* Collect feedback and allow us to reply to it

A complete list of commands is saved in the [commands.txt](https://github.com/saidolsol/mensabot_js/blob/master/commands.txt) file.

### How it does it

The bot is divided into three main parts. There is the botManager, that takes care of the message and gives the appropriate response. Then there are the get-functions, that provide the menus and finally there's the mensabot.js file, which puts all the pieces together.

In order to get the menus for the ETH cafeterias, the bot uses a JSON containing all relevant information put online by the ETH itself [(example lunch menu, 2016-06-06)](https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/2016-06-06/lunch). 

For the cafeterias of the UZH, we parse the HTML of the unis website, which is not a good solution, since it can break really fast if they chage anything. The alternative would be to get the data from the PDF file which the uni provides, but that seamed even more difficult than parsing the website (not to mention it can break just as fast).

If a cafeteria also offers dinner, the displayed menu changes at 14:00. The menus of the other cafeterias remain unchanged. 

I set up a cronjob to restart the program every night to update the JSONs.

The opening hours are saved as a string in an object and have to be edited manually. Therefore, they are not always up to date.

If a user asks for a menu during the weekends, the bot will simply respond that there are no cafeterias opened. This is generally true, although this could be handled more elegantly.

Also, we use (Botan)[http://botan.io/] for analytics. But don't worry, we do not pass on any sensible data to third parties.

### The infrastructure

I'm hosting the bot on a VM (Ubuntu) provided by the [SOSETH](http://sos.ethz.ch/ressorts/vsos/), a student's organization at the ETH.

### The future

Functions to come:
* Filling level of the vending machine in the student's lounge
* A nicer way to deal with weekends and other instances, when cafeterias don't provide a menu

### Why

Procrastination.

And it does indeed help to figure out where to get lunch.

### Libraries

* [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
* [botanio](https://www.npmjs.com/package/botanio)
* [fs](https://nodejs.org/api/fs.html)
