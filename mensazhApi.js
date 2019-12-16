var request = require('request');
var baseUrl = "http://mensazurich.ch:8080/api/";

/**
 *
 * Loads the german menu for the current day and mealtype lunch.
 *
 * @param mensaName the mensa name
 * @param category the mensa category <ETH-Zentrum, ETH-Hönggerberg, UZH-Zentrum, UZH-Irchel, others>
 * @param callbackFunction callbackFunction Function that gets invoked with the string representation of all the menus that were loaded.
 */
function getMenusForDefaultParams(mensaName, category, callbackFunction) {
    const defaultLang = "de";
    const defaultMealtype = "lunch";
    const date = new Date();
    getMenusForParams(mensaName, category, date.toISOString().split('T')[0], defaultLang, defaultMealtype, callbackFunction);
}

/**
 * Loads a Mensa with menus for the current week from the mensazurich API.
 * @see https://github.com/renezurbruegg/zhmensa-backend/blob/master/api.md
 *
 * @param mensaName the mensa which should be loaded.
 * @param category the mensa category <ETH-Zentrum, ETH-Hönggerberg, UZH-Zentrum, UZH-Irchel, others>
 * @param date the current date as string in yyyy-mm-dd format
 * @param language the requested language <de,en>
 * @param mealType the requested mealtype <lunch,dineer,all_day>
 * @param callbackFunction Function that gets invoked with the string representation of all the menus that were loaded.
 */
function getMenusForParams(mensaName, category, date, language, mealType, callbackFunction) {
    const requestUrl = baseUrl + language + "/" + category + "/" + "getMensaForCurrentWeek";
    console.log(requestUrl);

    request( {url:requestUrl, json:true}, function(error, response, body){
        if (!error && response.statusCode === 200) {

            if(!body.hasOwnProperty(mensaName)) {
                console.error("Mensa " + mensaName + " not found in response");
                return;
            }

            var mensaEntry = body[mensaName];
            var weekdays = mensaEntry.weekdays;

            if(!weekdays.hasOwnProperty(date)) {
                console.error("No Menu found for date: " + date);
                return;
            }

            const mealTypes = weekdays[date].mealTypes;

            if(!mealTypes.hasOwnProperty(mealType)) {
                console.error("Mealtype " + mealType + " not found for Mensa " + mensaName);
                console.error(mealTypes);
                return;
            }

            var menuList = mealTypes[mealType].menus;

            var returnString = "";
            for(var i = 0; i < menuList.length; i++) {
                returnString = returnString + ((returnString === "") ? "" : "\n") + parseMenuEntryToText(menuList[i]);
            }

            callbackFunction(returnString);
        }
        else {
            console.error("Error getting klaras menu from api");
            console.error(error);
        }
    });
}

/**
 * Converts a menu Entry to a simple text representation that can be shared using telegram
 *
 * @param menuEntry the menu entry that is returned by the mensazurich API
 * @returns the menu object as simple string in the form **menuName** <br> __date__ <br> <MenuDescription>
 */
function parseMenuEntryToText(menuEntry) {
    const date = menuEntry.date;
    const menuName = menuEntry.name;
    const descriptionArray = menuEntry.description;
    let description = "";

    for(let i = 0; i < descriptionArray.length; i++) {
        description = description + (description === "" ? "" : "\n") + descriptionArray[i].trim();
    }

    return  "**"+menuName + "**\n__" + date + "__\n" + description;

}

module.exports.getMenusForParams = getMenusForParams;
module.exports.getMenusForDefaultParams = getMenusForDefaultParams;
