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
  };

  const loadMessage = (selector, username, message, emotes) => {
    const chatBox = document.getElementById(selector);

    const options = {
      format: 'default',
      themeMode: 'dark',
      scale: '1.0',
    };

    if (chatBox) {
      // TODO: CHANGE USERNAME TO VAR USERNAME
      let fullMessage = parse(message, emotes, options);

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
  });
});
