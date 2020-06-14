const tmi = require("tmi.js");
const quotes = require("./data.js").quotes;

// Define configuration options
const opts = {
  identity: {
    username: "megantheebot",
    password: process.env.OAUTH,
  },
  channels: ["juiceboxhero"],
};
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  }

  let messageArray = msg.split(" ");
  let triggerList = quotes.map((command) => {
    return command.triggers;
  });
  console.log(messageArray);

  let escapedArray = messageArray.map((word) => {
    return word.toLowerCase().replace(/[^a-zA-Z ]/g, "");
  });
  // check each word in message against the triggerList array
  let dedupedArray = [...new Set(escapedArray)];
  dedupedArray.map((word) => {
    console.log(word);
    for (let i = 0; i < triggerList.length; i++) {
      if (triggerList[i].includes(word)) {
        if (Math.random() < 0.25) {
          client.say(target, quotes[i].quote);
          console.log(quotes[i].quote);
          return;
        }
      }
    }
  });
}

// Ignore messages from the bot
// msg, split it into an array, for each item in array check against triggers, return matched trigger

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
