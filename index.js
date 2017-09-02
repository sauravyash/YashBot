// discord
const Discord = require('discord.js');
const client = new Discord.Client();

// wit ai
const Wit = require('node-wit').Wit;
const clientWit = new Wit({accessToken: 'RQSTOQ2DHMLU5VSWUCVQU7QARUMJ6TWB'});
var botResponse = "";

// math js
var math = require('mathjs');

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
  if(command === 'deletelm') {
    message.delete().catch(O_o=>{});
  }

  // respond with to call
  if (command === 'ask') {
    const sayMessage = args.join(" ");
    clientWit.message(sayMessage, {}).then((data) => {
      var serverResponse = data;
      console.log(serverResponse.entities);
      if (serverResponse.entities.math_expression !== undefined){
        if (sayMessage === '0/0') {
          var botResponse = 'Imagine that you have zero cookies and you split them evenly among zero friends. How many cookies does each person get? See? It doesn’t make sense. And Cookie Monster is sad that there are no cookies, and you are sad that you have no friends';
        } else {
          var botResponse = math.eval(sayMessage);
        }
      console.log(serverResponse.entities);
      }
      else if (serverResponse.entities.intent !== undefined){
        if (serverResponse.entities.intent[0].value === 'ni')
        var botResponse = 'https://www.youtube.com/watch?v=S9zeQMbGEPc&t=9&end=22';
        message.channel.send('Get Lost!')
      }
      else {
        var botResponse = 'I did not understand what you asked me.'
      }
      //console.log(serverResponse.entities.intent[0].value);
      console.log('math is: ' + botResponse);
      message.reply('' + botResponse);
    }).catch(console.error);
    return;
  }
});



client.login('MzUyNzkxNzY3Njg0MzQ5OTY1.DImSgA.p2CNbr0MOMO5BdDop0Gb-rQCWTY');
