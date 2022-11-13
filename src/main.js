const path = require('path');
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setAlwaysOnTop(true, 'screen');
  win.menuBarVisible = false;
  win.setVisibleOnAllWorkspaces('true');
  win.loadFile('src/index.html');
};

let tray;

app.whenReady().then(() => {
  createWindow();

  const icon = nativeImage.createFromPath('assets/asset.png');
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);

  tray.setContextMenu(contextMenu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
