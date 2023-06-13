const path = require('path');
const fs = require('fs');

class Utils {

  lastWindowPosition() {
    var settings = this.settingsLoader();
    return {
      x: settings.lastPosition[0],
      y: settings.lastPosition[1],
    };
  };

  settingsLoader = () => {
    const settings = fs.readFileSync(
      path.join(__dirname, "..", 'settings.json'),
      'utf8'
    );
    return JSON.parse(settings);
  };


  async writeSettings(windowSize, windowPos) {
    const filePath = path.join(__dirname, "..", './settings.json');
    console.log(filePath)

    let winSize = windowSize;

    const settings = this.settingsLoader();

    let data = JSON.stringify({
      ...settings,
      width: winSize[0],
      height: winSize[1],
      lastPosition: windowPos,
    });

    fs.writeFileSync(filePath, data, (_) => {
      return -1;
    });
  };
}


exports.Utils = Utils;