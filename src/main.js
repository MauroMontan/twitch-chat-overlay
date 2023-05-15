const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');



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

  


let windowAnchors =  {
  topRight:{x:1150,y:5},
  topleft: {x:5,y:5},
  bottomLeft:{x:6,y:438},
  bottomRight:{x:1150,y:487}
}


  win.menuBarVisible =false;
  win.setPosition(windowAnchors.topRight.x,windowAnchors.topRight.y)
  win.setVisibleOnAllWorkspaces('true');
  win.loadFile('src/index.html');
  win.setAlwaysOnTop(true, 'screen');
  win.setFullScreenable(false);
  const icon = nativeImage.createFromPath(path.join(__dirname, "assets/icon.png"));

  let tray;

  

  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'toggle movement',type:"checkbox",checked:true, click: (e) => {
          if (e.checked){
            win.setIgnoreMouseEvents(true)
          }
          else {
            win.setIgnoreMouseEvents(false)
          }
    } },
    
    {label:"bottom left",type:"radio",click:()=>{
      win.setPosition(x=windowAnchors.bottomLeft.x,
        y=windowAnchors.bottomLeft.y)
    }},
    {label:"bottom right",type:"radio",click:()=>{
      win.setPosition(x=windowAnchors.bottomRight.x,
        y=windowAnchors.bottomRight.y)
    }},
    {label:"top left",type:"radio",click:()=>{
      win.setPosition(x=windowAnchors.topleft.x,
        y=windowAnchors.topleft.y)
    }},
    {label:"top right",type:"radio",click:()=>{
      win.setPosition(x=windowAnchors.topRight.x,
        y=windowAnchors.topRight.y)
    }},
    { label: 'close', click: () => { win.destroy() } },
  ]);


 




  tray.setContextMenu(contextMenu);

 
  tray.setToolTip('rogers chat settings');


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
