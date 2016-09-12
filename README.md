# Mensabot Zürich by saidolsol and gingeneer

This is a german speaking chat bot for the messenger app [Telegram](https://telegram.org). It was created to provide users with menus of all cafeterias on the ETH and UZH campuses in Zürich. Although this does work for ETH cafeterias, it turned out to be a little more difficult for the UZH cafeterias.

### What it does

Currently, the bot can do the following:
* Provide the daily menu for all ETH cafeterias
* Provide opening hours for different businesses around the ETH city campus
* Collect feedback and allow me to reply to it

A complete list of commands is saved in the [commands.txt](https://github.com/saidolsol/mensabot_js/blob/master/commands.txt) file.

### How it does it

For its main function, providing the cafeteria menus, the bot uses a JSON containing all relevant information put online by the ETH  [(example lunch menu, 2016-06-06)](https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/2016-06-06/lunch). The bot downloads the files (lunch and dinner separately) every day for the particular date and manipulates them a little bit. On request, the bot then reads the wanted information from the JSON and passes it on to the user. 

If a cafeteria also offers dinner, the displayed menu changes at 14:00. The menus of the other cafeterias remain unchanged.

I set up a cronjob to restart the program every night to update the JSONs.

The opening hours are saved as a string in an object and have to be edited manually. Therefore, they are not always accurate.

### The infrastructure

It's running on node.js using [this](https://github.com/yagop/node-telegram-bot-api) library. 

I'm hosting the bot on a VM (Ubuntu) provided by the [SOSETH](http://sos.ethz.ch/ressorts/vsos/), a student's organization at the ETH.

### The future

Functions to come:
* Menus of the UZH cafeterias (HTML parsing necessary)
* Filling level of the vending machine in the student's lounge

### Why

Procrastination.

And it does indeed help to figure out where to get lunch. Especially when that's discussed in a group chat. 
