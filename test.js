// wolfram alpha
var wolfram = require('wolfram').createClient("7A4V76-29EG5L33J7");

var sayMessage = 'what is th distance from earth to the sun?';

wolfram.query(sayMessage, function(err, result) {
  if(err) throw err
  console.log("Result: %j", result[0].subpods[0].value);
  var botResponse = result[0].subpods[0].value;
});
