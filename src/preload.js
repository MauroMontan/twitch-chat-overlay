const tmi = require('tmi.js');
const { parse } = require('simple-tmi-emotes');

const client = new tmi.Client({
  channels: ['elded'],
});

window.addEventListener('DOMContentLoaded', () => {
  client.connect();

  const scrollToEnd = (chatBox) => {
    let scrollHeight = chatBox.scrollHeight;
    chatBox.scrollTop = scrollHeight;

    console.log(scrollHeight);
  };

  const loadMessage = (selector, username, message, emotes) => {
    const chatBox = document.getElementById(selector);

    const options = {
      format: 'default',
      themeMode: 'dark',
      scale: '1.0',
    };

    if (chatBox) {
      let fullMessage = `${username}: ${parse(message, emotes, options)}`;
      console.log(typeof fullMessage);

      let li = document.createElement('li');

      li.innerHTML = fullMessage;
      chatBox.append(li);

      scrollToEnd(chatBox);
    }
  };

  // https://static-cdn.jtvnw.net/emoticons/v2/425618/default/light/2.0
  //

  client.on('message', (channel, tags, message, self) => {
    // "Alca: Hello, World!"

    loadMessage('chat-box', tags['display-name'], message, tags.emotes);
    setInterval(() => {}, 1000);
  });
});
