// wolfram alpha
var wolfram = require('wolfram').createClient('7A4V76-29EG5L33J7');

var sayMessage = 'distance from sydney to canberra'
var botResponse = '';
wolfram.query(sayMessage, function(err, result) {
  if(err) throw err
  // console.log(result);
  //console.log(require('util').inspect(result, { depth: null }));
  // console.log(result.length);

  if(result !== undefined) {
    var n = 0;
    while (n<result.length){
      var responseData = result[n];
      // console.log(responseData);
      if (responseData.title !== undefined && responseData.title === 'Map'){
        var map = responseData.subpods[0].image;
      }
      if (responseData.title !== undefined && responseData.title === 'Result'){
        var info = responseData.subpods[0].value;
      }
      if (responseData.title !== undefined && responseData.title === 'Input interpretation'){
        var title = responseData.subpods[0].value;
      }
      n++
    }
    var botResponse = title.replace('\n',' ') + '\n' + info.replace('\n',' ')

  }
  else {
    var botResponse = 'The results never came back. :('
  }
  console.log(botResponse);
})
