var request = require("request")
var title = "";
var desc = "";
var JSONinfo = "";
var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack_Overflow";
console.log('im ready');
request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var key = Object.keys(body.query.pages)[0];
      //console.log(body) // Print the json response
      var theJSON = Object.entries(body.query.pages);
      var tmpJSON = theJSON[0];
      console.log(tmpJSON[1].title);
      //var JSONinfo = body;
    }
});

//console.log(JSONinfo);
console.log(title);
console.log(desc);
