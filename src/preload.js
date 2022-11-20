const tmi = require('tmi.js');
const { parse } = require('simple-tmi-emotes');

const settingsLoader = async () => {
  let settings = await fetch('settings.json');
  return await settings.json();
};

window.addEventListener('DOMContentLoaded', async () => {
  const settings = await settingsLoader();

  const client = new tmi.Client({
    channels: [settings.channel],
  });
  client.connect();

  const scrollToEnd = (chatBox) => {
    let scrollHeight = chatBox.scrollHeight;
    chatBox.scrollTop = scrollHeight;
  };

  const loadMessage = (selector, username, color, message, emotes) => {
    const chatBox = document.getElementById(selector);

    chatBox.style.fontSize = settings.fontSize;

    const options = {
      format: 'default',
      themeMode: 'dark',
      scale: '1.0',
    };

    if (chatBox) {
      setTimeout(() => {
        let fullMessage = parse(message, emotes, options);

        let li = document.createElement('li');

        li.innerHTML =
          `<a style="color:${color};">${username}</a><b>:</b> ` +
          '  ' +
          fullMessage;

        chatBox.append(li);

        scrollToEnd(chatBox);
      }, 1300);
      // TODO: CHANGE USERNAME TO VAR USERNAME
    }
  };

  // https://static-cdn.jtvnw.net/emoticons/v2/425618/default/light/2.0
  //

  client.on('message', (channel, tags, message, self) => {
    console.log(channel);
    loadMessage(
      'chat-box',
      tags['display-name'],
      tags['color'],
      message,
      tags.emotes
    );
  });
});
