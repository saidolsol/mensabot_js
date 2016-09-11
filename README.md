# Mensabot Zürich by saidolsol and gingeneer

### What it does

This is a bot for telegram, providing menus for selected cafeterias on and around the ETH Zurich's campus. Apart from that it also gives you the opening hours for different business, that may be of interest to many students (currently a beer shop and several food places).

### How it does it

Its main function is to get the menus from the ETH cafeterias. These are all available online as one single JSON file [(example lunch menu, 2016-06-06)](https://www.webservices.ethz.ch/gastro/v1/RVRI/Q1E1/meals/de/2016-06-06/lunch). The bot downloads the file every day for the particular date and manipulates it a little bit. On request, the bot then reads the wanted information from the JSON and passes it on to the user. I set up a cronjob to restart the program every night to update the JSONs.

The opening hours are saved as a string in an object and have to be edited manually. Therefore, they are not always accurate.

### The feedback function
Users also have the ability to send me messages if they have any complaints or suggestions. This is especially important when some business changes its opening hours. I do also have the ability to directly respond to the chat the feedback was sent from.

### The infrastructure

It's running on node.js using [this](https://github.com/yagop/node-telegram-bot-api) library.
I used to run the bot on gingeneers old laptop with a dynamic DNS and very little RAM. Now however, I'm hosting the bot on a VM offered to me by the [SOSETH](http://sos.ethz.ch/ressorts/vsos/), a student's organization at the ETH.

### The future

The bot is far from finished.  Next, I'll try to add the UZH cafeterias. I also plan on adding a function to the bot, telling users the beer level of the vending machine in the "AMIV-Aufenthaltsraum".

### Why

Procrastination.
