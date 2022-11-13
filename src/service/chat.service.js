const tmi = require('tmi.js');

const client = new tmi.Client({});

client.connect();

const chatList = document.querySelector('.chat-loader');

// badge-info,badges,color,display-name,emotes,first-msg,flags,id,mod,msg-id,returning-chatter,room-id,subscriber,tmi-sent-ts,turbo,user-id,user-type,emotes-raw,badge-info-raw,badges-raw,username,message-type

client.on('message', (channel, tags, message, self) => {
  // "Alca: Hello, World!"
  console.log(` ${tags['emotes-raw']}`);
});

client.on('subscription', (channel, username, method, message, userstate) => {
  console.log(
    `${username} - ${method.planName} - ${userstate['message-type']}: ${message}`
  );
  // Do your stuff.
});
