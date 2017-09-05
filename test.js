/*// wolfram alpha
var wolfram = require('wolfram').createClient("7A4V76-29EG5L33J7");

var sayMessage = 'what is th distance from earth to the sun?';

wolfram.query(sayMessage, function(err, result) {
  if(err) throw err
  console.log("Result: %j", result[0].subpods[0].value);
  var botResponse = result[0].subpods[0].value;
});
*/

//var conf = {  "witKey": "H6HPQEBGA453N7XWFO7EUXC5TYWCFMJA",  "discordKey": "MzUyNzkxNzY3Njg0MzQ5OTY1.DImSgA.p2CNbr0MOMO5BdDop0Gb-rQCWTY"};
var conf = require("./config.json");
console.log(conf);
