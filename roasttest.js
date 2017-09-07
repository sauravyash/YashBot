// filesystem node
var fs = require('fs');
var math = require('mathjs');

var roastArray;
var roastArrayLength;

function loadRoast() {
  // load comebacks  var roastArray;var roastArrayLength;

  fs.readFile('./roasts', function(err, data) {
      if(err) throw err;
      var roastArray = data.toString().split("\n");
      // for(i in array) {console.log(array[i])}
      // var roastArray = JSON.stringify(roastArray);
      // console.log(roastArray);
      // var roastArrayLength = parseInt(roastArraroastArrayy.length);
  });
  // return roastArray; // math.floor(math.random()*744)];
}

loadRoast();

console.log(roastArray);
