// filesystem node
var fs = require('fs');
var moment = require('moment');

// declare key vars
var discordKey, witKey, wolframKey, giphyKey;

if (fs.existsSync('./config.json')) {
    var config = require("./config.json");
    var discordKey = config.discordKey;
    var witKey = config.witKey;
    var wolframKey = config.wolframKey;
    var giphyKey = config.giphyKey;
    var youtubeKey = config.youtubeKey;
}
else {
  var discordKey = process.env.discordKey;
  var witKey = process.env.witKey;
  var wolframKey = process.env.wolframKey;
  var giphyKey = process.env.giphyKey;
  var youtubeKey = process.env.youtubeKey;
}

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(discordKey);

// when discord bot is ready
client.on('ready', () => {
  console.log('I am ready!');
});

var currentTime = moment().toDate().getTime();

console.log(currentTime);
