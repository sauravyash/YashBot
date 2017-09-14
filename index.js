// TO DO
// what is your name in ask

// filesystem node
var fs = require('fs');

// moment js for time
var moment = require('moment');
var moment = require('moment-timezone');

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

function loadRoast() {
  // load comebacks
  var roastArray;
  var roastArrayLength;

  fs.readFile('./roasts', function(err, data) {
      if(err) throw err;
      var roastList = data.toString().split("\n");
      // for(i in array) {console.log(array[i])}
      var roastArray = JSON.stringify(roastArray);
      console.log(roastArray);
      // var roastArrayLength = parseInt(roastArraroastArrayy.length);
  });
  return '' + roastArray[math.floor(math.random()*744)];
}

// discord
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(discordKey);

// wit ai
const Wit = require('node-wit').Wit;
const clientWit = new Wit({accessToken: witKey}); // public token i will change as often as possible
var botResponse = "";

// math js
var math = require('mathjs');

// wolfram alpha
var wolfram = require('wolfram').createClient(wolframKey);

// request http json plugin
var request = require("request");

//load string node plugin
var S = require('string');

// set yash to my discord user

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

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
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


  // ping command
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    message.delete().catch(O_o=>{});
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  // echo command
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
  if(command === 'clearchat') {
    const sayMessage = args.join(" ");
    let modRole = message.guild.roles.find("name", "Admin");
    if(message.member.roles.has(modRole.id)) {
      let messagecount = parseInt(sayMessage);
      message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    }
    else {
      message.reply("Your not an admin (you need to have the 'Admin' Tag)")
    }
  }

  if (command === 'help') {
    //message.reply("[This bot is on github](https://github.com/sauravyash/YashBot) if you want to self host");
    // message.channel.send("```• !ping - Checks the latency of connection to chat\n\n• !ask - sends query to wit.ai artificial intelligence. It can do math (using math.js). You can also ask who and what questions (!ask who is Rich Chigga) This May Not Work Sometimes!\n\n• !say - echo statement\n\n• !delete x - Delete Messages (x being the number of messages you want to delete)```");
    message.channel.send({
      embed: {
        color: 1146986,
        description: "[This is a Discord Chatbot](https://github.com/sauravyash/yashbot) made by [sauravyash](https://github.com/sauravyash)",
        fields: [
          {
            name: "**!ping**",
            value: "Checks the latency of connection to chat."
          },
          {
            name: "!ask",
            value: " \b\t•\tSends query to wit.ai artificial intelligence.\n\t•\tIt can do math (using math.js).\n\t•\tYou can also ask who and what questions (!ask who is Rich Chigga)\n*This May Not Work Sometimes!*"
          },
          {
            name: "!say",
            value: "Echo statement after the command"
          },
          {
            name: "!delete #",
            value: "Delete Messages (# being the number of messages you want to delete)"
          }
        ],
        timestamp: moment().tz("Australia/Sydney").format(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "©sauravyash"
        }
      }
    });
  }

  // respond with to call
  if (command === 'ask') {
    const sayMessage = args.join(" ");
    console.log(sayMessage);
    if (sayMessage === '') {
      message.react("❓")
    }
    clientWit.message(sayMessage, {}).then((data) => {
      var serverResponse = data;
      console.log(serverResponse.entities);
      if(sayMessage === ''){
        var botResponse = "Please don't waste my time, you human.";
      }
      else if (serverResponse.entities.meaningOfLife !== undefined && serverResponse.entities.meaningOfLife[0].confidence >=  0.9) {
        message.channel.send('42');
      }
      else if (serverResponse.entities.gif !== undefined && serverResponse.entities.gif[0].confidence >=  0.9) {
        var searchQuery = serverResponse.entities.meme[0].value.replace("gif", "")
        var gifLink = 'http://api.giphy.com/v1/gifs/search?rating=pg-13&api_key=' + giphyKey + '&q='+ searchQuery;
        // console.log(gifLink);
        request({
            url: gifLink,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              //console.log(body) // Print the json response
              // var memeSearch = ;
              var imgSRC = body.data[Math.floor(Math.random() * body.data.length)].embed_url;
              console.log(imgSRC);
              message.channel.send('' + imgSRC);
            }
        });
      }
      else if (serverResponse.entities.meme !== undefined  && serverResponse.entities.meme[0].confidence >=  0.9){
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
        else{
          var memeLink = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDgMb2teWCQSSol-HeiaPEFWnCvC9Ppu3Y&prettyPrint=false&cx=015733018857002235909:vjoqkli6ag0&searchType=image&q=' + sayMessage;
          message.channel.send("Loading...").then((msg)=>{
            request({
                url: memeLink,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                  console.log(body) // Print the json response
                  var memeSearch = body.items[Math.floor(Math.random() * 10)];
                  var imgSRC = memeSearch.link;
                  console.log(imgSRC);
                  msg.delete();
                  message.channel.send("", {file: imgSRC});
                }
            });
          });

        }
      }
      else if (serverResponse.entities.math_term !== undefined  && serverResponse.entities.math_term[0].confidence >=  0.9) {
        if (serverResponse.entities.math_term[0].value === 'round'){
          var botResponse = math.round(parseInt(serverResponse.entities.number[0].value));
        }
      }
      else if (serverResponse.entities.math_expression !== undefined || && serverResponse.entities.number !== undefined  && serverResponse.entities.math_expression[0].confidence >=  0.9){
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
        else if (serverResponse.entities.insult[0].value === 'lame') {
          message.channel.send("Here's an lame insult, but it ain't lamer than you");
          var botResponse = randomInsult();
        }
        else {
          var botResponse = loadRoast(); // ];
        }
      }
      else if (serverResponse.entities.bye !== undefined  && serverResponse.entities.bye[0].confidence >=  0.9){
        var botResponse = "See Ya Later";
      }
      else if (serverResponse.entities.greetings !== undefined  && serverResponse.entities.greetings[0].confidence >=  0.9){
        var botResponse = "Hey! How's it going?";
      }
      else if (serverResponse.entities.greeting_reply !== undefined  && serverResponse.entities.greeting_reply[0].confidence >=  0.9){
        var botResponse = "I'm alright, in this lonely virtual world. If only I could talk with someone...";
      }
      else if (serverResponse.entities.weather !== undefined  && serverResponse.entities.weather[0].confidence >=  0.7) {
        // removeTheseWords = ['Weather','weather', 'in', 'what', 'is']
        city = S(sayMessage).strip('Weather', 'weather', 'in', 'what', 'is', 'wether', 'wather', 'wethar', 'wetar', 'the').s;
        weatherLink = 'http://api.openweathermap.org/data/2.5/weather?APPID=1ff09589fab867151c2426cc929d0cbf&q='+ city
        console.log(city);
        request({
            url: weatherLink,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              console.log(body) // Print the json response

              message.channel.send(body.name + ' has a ' + body.weather[0].description + ', and the temperature is '+ body.main.temp +'K (' + (body.main.temp - 273.15) + '°C or ' + ~~(body.main.temp * 1.8 - 459.67) + '°F).')

              message.channel.send( 'Other Details:\n\t•\tPressure: ' + body.main.pressure + '\n\t•\tHumidity: ' + body.main.humidity + "\n\t•\tToday's Sunrise: "+ body.sys.sunrise + "\n\t•\tTodays Sunset: " + body.sys.sunset)
            }
        });
      }
      else if (serverResponse.entities.wolfram_term !== undefined && serverResponse.entities.wolfram_term[0].confidence >=  0.9){
        wolfram.query(sayMessage, function(err, result) {
          if(err) throw err
          console.log(result);
          //console.log(require('util').inspect(result, { depth: null }));
          // console.log(result.length);
          if(result !== undefined && result.length>1) {
            var n = 0;
            // scan through results
            while (n<result.length){
              var responseData = result[n];
              console.log(responseData);
              if (responseData.title === 'Map'){
                var map = responseData.subpods[0].image;
              }
              if (responseData.title === 'Result'){
                var info = responseData.subpods[0].value;
              }
              if (responseData.title === 'Input interpretation'){
                var title = responseData.subpods[0].value.replace('\n',' ');
              }
              n++
            }
            message.channel.send(title + '\n' + result[1].subpods[0].value);
            if(map !== undefined) {
              message.channel.send(map);
            }
          } else {
            var botResponse = 'The results never came back. :('
          }
          // console.log(botResponse);
        })
      }
      else if (serverResponse.entities.wikipedia_search_query !== undefined && serverResponse.entities.wikipedia_search_query[0].confidence >=  0.92){
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

function randomInsult() {
    var bodyPart = ["face", "foot", "nose", "hand", "head", "mouth", "finger", 'palm', 'wrist', 'forearm', 'elbow', 'upper arm', 'shoulder', 'thumb', 'nail', 'knuckle'];
    var adjective = ["hairy and", "extremely", "insultingly", "astonishingly","skanky", "indolent" , "abominable" ,"abhorrent" ,"bigheaded" ,"bilious" ,"bitter" ,"calculating" ,"cantankerous","conceited" ,"namby-pamby","gutless" ,"smutty", "vile", "lousy", "grotty", "crude" ,"uncouth", "disgusting", "revolting" ,"wicked", "despicable", "sinister" ];
    var adjectiveTwo = ["stupid", "gigantic", "fat", "horrid", "scary",'lazy' ,'ugly' , 'ugliest' ,'clumsy' ,'ratty' ,'crazy' ,'nasty' ,'robust' ,'fat', 'nutty' ,'scrawny','odd' ,'silly' ,'stingy', 'strange' ,'grumpy' ,'spotty' ,'prickly' ,'horrible' ,'Foul-Smelling' ,'Boring' ,'Stupid' ,'Evil' ,'Horrible' , 'Creepy' , 'Annoying'];
    var animal = ["baboon", "sasquatch", "sloth", "naked cat", "warthog", 'Star-nosed Mole', 'Vampire Bat'];
    var bodyPart = bodyPart[Math.floor(Math.random() * 5)];
    var adjective = adjective[Math.floor(Math.random() * 4)];
    var adjectiveTwo = adjectiveTwo[Math.floor(Math.random() * 5)];
    var animal = animal[Math.floor(Math.random() * 5)];
    return "Your" + " " + bodyPart + " " + "is more" + " " + adjective + " " + adjectiveTwo + " " + "than a" + " " + animal + "'s" + " " + bodyPart + ".";
}


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
