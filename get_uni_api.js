var request = requre("request");
var mensas = require("./mensas.json")
var mensas_abig = require("./mensas_abig.json");

// get the uni menus using the api of zfv. the format is as follows: 
// http://zfv.ch/de/menus/rssMenuPlan?menuId=235&&dayOfWeek=1 
// menuid is the mensa id and dayOfWeek is monday = 1 ...

function get_uni_api() {
  var menuIds = {
    "UZH untere Mensa A": 147,
    "UZH obere Mensa B": 148,
    "UZH Lichthof": 150,
    "UZH Irchel": "",
    "UZH Tierspital": "",
    "UZH Zentrum Für Zahnmedizin": "",
    "UZH Platte": "",
    "UZH Rämi 59 (vegi)": ""
  }
}