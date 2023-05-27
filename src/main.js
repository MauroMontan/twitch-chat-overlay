const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');



let borderDragIndicator = false;
exports.borderDragIndicator = borderDragIndicator;


let appIcon = nativeImage.createEmpty();

const settingsLoader = () => {
  const settings = fs.readFileSync(
    path.join(__dirname, 'settings.json'),
    'utf8'
  );
  return JSON.parse(settings);
};



const writeSettings = async (windowSize, windowPos) => {

  const filePath = path.join(__dirname, './settings.json');

  let winSize = windowSize;

  const settings = await settingsLoader();

  let data = JSON.stringify({
    ...settings,
    width: winSize[0],
    height: winSize[1],
    lastPosition: windowPos
  });

  fs.writeFileSync(filePath, data, (_) => {
    return -1;
  });


}


const createWindow = async () => {
  const settings = await settingsLoader();
  const win = new BrowserWindow({
    icon: appIcon,
    width: settings.width,
    height: settings.height,
    acceptFirstMouse: false,
    focusable: false,
    roundedCorners: true,
    movable: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  console.log(win.getSize());

  let defaultwindowPos = { x: 0, y: 0 };

  let setWindowPos = async () => {

    var settings = await settingsLoader();

    defaultwindowPos = {
      x: settings.lastPosition[0],
      y: settings.lastPosition[1]
    }
  }


  await setWindowPos();


  win.frame
  win.menuBarVisible = false;
  win.setPosition(defaultwindowPos.x, defaultwindowPos.y)
  win.setVisibleOnAllWorkspaces('true');
  win.loadFile('src/index.html');
  win.setAlwaysOnTop(true, 'screen');
  win.setFullScreenable(true);


  const icon = nativeImage.createFromPath(path.join(__dirname, "assets/icon.png"));

  let trayIcon = icon.resize({ width: 16 })

  trayIcon.setTemplateImage(true);

  let tray;



  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'toggle movement', type: "checkbox", checked: false, click: (e) => {
        if (e.checked) {

          borderDragIndicator = true;
          win.setIgnoreMouseEvents(true)
        }
        else {

          borderDragIndicator = false;
          win.setIgnoreMouseEvents(false)
        }
      }
    },


    {
      label: 'close', click: () => {
        writeSettings(win.getSize(), win.getPosition());
        win.destroy()
      }
    },
  ]);


  tray.setContextMenu(contextMenu);


  tray.setToolTip('rogers chat settings');


  tray.on('click', function(_) {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  });


};

//app.disableHardwareAcceleration();




app.whenReady().then(() => {
  createWindow();

  app.on('activate', (_) => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
