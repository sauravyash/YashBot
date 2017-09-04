// filesystem node
var fs = require('fs');
// keys
//var conf = require("./config.json");
// heroku config vars
// const aws = require('aws-sdk');
// var herokuKey = new aws.S3({witKey: process.env.witKey,discordKey: process.env.discordKey});
var conf = {  "witKey": "H6HPQEBGA453N7XWFO7EUXC5TYWCFMJA",  "discordKey": "MzUyNzkxNzY3Njg0MzQ5OTY1.DImSgA.p2CNbr0MOMO5BdDop0Gb-rQCWTY"}

// discord
const Discord = require('discord.js');
const client = new Discord.Client();

// wit ai
const Wit = require('node-wit').Wit;
const clientWit = new Wit({accessToken: conf.witKey}); // public token i will change as often as possible
var botResponse = "";

// math js
var math = require('mathjs');

// wolfram alpha
var wolfram = require('wolfram').createClient("7A4V76-29EG5L33J7");

// request http json plugin
var request = require("request")


// when discord bot is ready
client.on('ready', () => {
  console.log('I am ready!');
});

// when bot joins a gulild
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

// when the bot is removed from a guild.
client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf('!') !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    message.delete().catch(O_o=>{});
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    if (Math.round(client.ping) > 50) {
      message.channel.send("", {
          file: "https://pbs.twimg.com/media/CURozNvUAAAhHCF.png"
      });
    }
    else {
      message.channel.send("", {
          file: "https://pbs.twimg.com/media/CURozNvUAAAhHCF.png"
      });
    }
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  //delete last message
  if(command === 'delete') {
    const sayMessage = args.join(" ");
    let modRole = message.guild.roles.find("name", "Admin");
    if(message.member.roles.has(modRole.id)) {
      let messagecount = parseInt(sayMessage);
      message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    }
    else {
      return message.reply("Your not an admin :(")
    }
  }

  // respond with to call
  if (command === 'ask') {
    const sayMessage = args.join(" ");
    clientWit.message(sayMessage, {}).then((data) => {
      var serverResponse = data;
      console.log(serverResponse.entities);
      if(sayMessage === ''){
        var botResponse = "Please don't waste my time, you human.";
      }
      else if (serverResponse.entities.meaningOfLife !== undefined){
        message.channel.send('42');
      }
      else if (serverResponse.entities.meme !== undefined){
        if (serverResponse.entities.meme[0].value === 'doge'){
          message.channel.send("", {
              file: "http://i.imgur.com/E5cFOWY.jpg"
          });
        }
        else if (serverResponse.entities.meme[0].value === 'dat boi'){
          message.channel.send("", {
              file: "http://i0.kym-cdn.com/photos/images/facebook/001/114/967/63f.jpg"
          });
        }
        else if (serverResponse.entities.meme[0].value === 'playboy'){
          message.channel.send("", {
              file: "https://res.cloudinary.com/teepublic/image/private/s--TRM-_Kj3--/t_Preview/b_rgb:c8e0ec,c_limit,f_jpg,h_630,q_90,w_630/v1462386297/production/designs/502590_1.jpg"
          });
        }
        else if (serverResponse.entities.meme[0].value === 'lit'){
          message.channel.send("", {
              file: "https://i.imgur.com/xDarAVy.jpg"
          });
        }
        else if (serverResponse.entities.meme[0].value === 'skyrim'){
          message.channel.send("", {
              file: "https://i.pinimg.com/736x/78/fb/39/78fb3994a9f0c2d23cdac300ad8f703b--skyrim-so-true.jpg"
          });
        }
        else {
          message.channel.send("IDK this meme yet", {
              file: "http://i0.kym-cdn.com/entries/icons/original/000/023/033/image.jpeg"
          });
        }
      }
      else if (serverResponse.entities.math_term !== undefined) {
        if (serverResponse.entities.math_term[0].value === 'round'){
          var botResponse = math.round(parseInt(serverResponse.entities.number[0].value));
        }
      }
      else if (serverResponse.entities.math_expression !== undefined && serverResponse.entities.number !== undefined ){
        if (sayMessage === '0/0') {
          var botResponse = 'Imagine that you have zero cookies and you split them evenly among zero friends. How many cookies does each person get? See? It doesn’t make sense. And Cookie Monster is sad that there are no cookies, and you are sad that you have no friends';
        } else {
          var botResponse = math.eval(sayMessage);
        }
      // console.log(serverResponse.entities);
      }
      else if (serverResponse.entities.intent !== undefined){
        if (serverResponse.entities.intent[0].value === 'ni') {
          var botResponse = 'https://www.youtube.com/watch?v=S9zeQMbGEPc&t=9&end=22';
          message.channel.send('Get Lost!');
        }
      }
      else if (serverResponse.entities.insult !== undefined){
        if (serverResponse.entities.insult[0].value === 'stupid') {
          var botResponse = "Remember when I asked for your opinion? Me neither.";
        }
        else if (serverResponse.entities.insult[0].value === 'retard') {
          var botResponse = "I can’t help imagining how much awesomer the world would be if your dad had just pulled out.";
        }
        else if (serverResponse.entities.insult[0].value === 'terrible') {
          var botResponse = "Do your parents even realize they’re living proof that two wrongs don’t make a right?";
        }
      }
      else if (serverResponse.entities.bye !== undefined){
        var botResponse = "See Ya Later";
      }
      else if (serverResponse.entities.greetings !== undefined){
        var botResponse = "Hey! How's it going?";
      }
      else if (serverResponse.entities.greeting_reply !== undefined){
        var botResponse = "I'm alright, in this lonely virtual world. If only I could talk with someone...";
      }
      else if (serverResponse.entities.wikipedia_search_query !== undefined){
        var wikiTitle = serverResponse.entities.wikipedia_search_query[0].value;
        var wikiLink = "https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json&srsearch=" + wikiTitle;
        request({
            url: wikiLink,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              //console.log(body) // Print the json response
              // var dataJSON = ;
              var dataJSON = body.query.search[0];
              if (dataJSON !== undefined) {
                var title = dataJSON.title;
                var extract = dataJSON.extract;
                message.channel.send(title);
                var key = dataJSON.pageid;
                request({
                    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=' + key,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                      var tmpJSON = Object.entries(body.query.pages);
                      var dataJSON = tmpJSON[0];
                      var extract = dataJSON[1].extract;
                      message.channel.send(extract.substring(0, 300) + '...');
                      // console.log(dataJSON[1].extract);
                    }
                });
                // console.log(dataJSON[1].extract);
              }
              else {
                message.channel.send("I don't know what " + wikiTitle + " means.");
              }
            }
        });
      }
      else if (serverResponse.entities.wolfram_search_query !== undefined){
        //function (callback) {
          wolfram.query(sayMessage, function(err, result) {
            if(err) throw err
            console.log("Result: %j", result[0].subpods[0].value);
            var botResponse = result[0].subpods[0].value;
          });
        // }
      }

      else {
        var botResponse = 'I did not understand what you asked me.'
        message.channel.send("ಠ_ಠ", {
            file: "http://weknowmemes.com/wp-content/uploads/2011/09/look-of-disapproval.jpg"
        });
      }
      //console.log(serverResponse.entities);
      // console.log(botResponse);
      if (botResponse !== undefined){
        message.channel.send('' + botResponse)
      }
    }).catch(console.error);
    return;
  }
});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

client.login(conf.discordKey);
