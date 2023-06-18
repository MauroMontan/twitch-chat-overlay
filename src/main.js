const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, Tray, nativeImage } = require('electron');
const { Utils } = require("./utils/utils")
const { trayMenuTemplate } = require("./tray_context_menu");


const utils = new Utils();

let appIcon = nativeImage.createEmpty();

const settings = utils.settingsLoader();

const createWindow = async () => {

  const win = new BrowserWindow({
    icon: appIcon,
    width: settings.width,
    hasShadow: false,
    show: true,
    height: settings.height,
    acceptFirstMouse: false,
    focusable: false,
    roundedCorners: true,
    alwaysOnTop: true,
    fullscreenable: false,
    fullscreen: true,
    movable: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  win.menuBarVisible = false;
  win.setVisibleOnAllWorkspaces(true);
  win.setPosition(utils.lastWindowPosition().x, utils.lastWindowPosition().y);
  win.loadFile('src/index.html');
  win.setAlwaysOnTop(true, 'floating');
  win.setFullScreenable(true);


  const icon = nativeImage.createFromPath(
    path.join(__dirname, 'assets/icon.png')
  );

  let trayIcon = icon.resize({ width: 16 });

  trayIcon.setTemplateImage(true);

  let tray;

  tray = new Tray(trayIcon);

  const contextMenu = trayMenuTemplate(win, utils);

  tray.setContextMenu(contextMenu);

  tray.setToolTip('rogers chat settings');

  tray.on('click', function (_) {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });

};


if (settings.hardwareAccelerationDisabled) {
  app.disableHardwareAcceleration();
}

app.whenReady().then(() => {

  createWindow();

  app.on('activate', (_) => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
