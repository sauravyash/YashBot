const Wit = require('node-wit').Wit;
const client = new Wit({accessToken: 'RQSTOQ2DHMLU5VSWUCVQU7QARUMJ6TWB'});
client.message('what is the weather in London?', {})
.then((data) => {
  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
})
.catch(console.error);
