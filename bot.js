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


var bot = require("discord-music-bot");

var config = require("./config.json");
var discordKey = config.discordKey;
var witKey = config.witKey;
var wolframKey = config.wolframKey;
var giphyKey = config.giphyKey;
var youtubeKey = config.youtubeKey;

bot.setYoutubeKey(youtubeKey);
var serverName = 'The Elder Scrollers';
var textChannelName = "music-talk";
var voiceChannelName = "Skyrim Bard Music";
var aliasesFile = "aliasesMusic";
var botToken = discordKey;

bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, botToken);
