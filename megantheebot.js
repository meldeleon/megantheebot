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
  console.log("triggerList:" + triggerList);
  console.log(messageArray);
  // check each word in message against the triggerList array

  messageArray.map((word) => {
    console.log(word);
    for (let i = 0; i < triggerList.length; i++) {
      console.log(i);
      if (triggerList.includes(word)) {
        console.log(quotes.trigger[i].quote);
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
