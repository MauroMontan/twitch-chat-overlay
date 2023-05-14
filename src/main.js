const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');




let canMoveWindow = false;

let appIcon = nativeImage.createEmpty();

const settingsLoader = () => {
  const settings = fs.readFileSync(
    path.join(__dirname, 'settings.json'),
    'utf8'
  );
  return JSON.parse(settings);
};

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


  win.menuBarVisible = false;
  win.setVisibleOnAllWorkspaces('true');
  win.loadFile('src/index.html');
  win.setIgnoreMouseEvents(true);
  win.setAlwaysOnTop(true, 'screen');
  win.setFullScreenable(false);
  const icon = nativeImage.createFromPath(path.join(__dirname, "assets/icon.png"));

  let tray;

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'close', click: () => { win.destroy() } },
    { label: 'toggle movement: ' + canMoveWindow ? "yes" : "no", click: () => { canMoveWindow = !canMoveWindow } },
  ]);

  tray.setContextMenu(contextMenu);


  tray.setToolTip('This is my application.');


  tray.on('click', function(e) {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  });


};

app.disableHardwareAcceleration();


app.whenReady().then(() => {
  createWindow();

  app.on('activate', (event) => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
