const path = require('path'),
  isDev = require('electron-is-dev');
   
let mainWindow;
const {Tray, Menu, ipcMain, BrowserWindow, app} = require("electron") 
var trayWindow, tray;
const TrayWindow = require("electron-tray-window");

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1064, height: 768 })

  const appUrl = isDev ? 'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(appUrl)
  mainWindow.maximize()
  mainWindow.on('closed', () => mainWindow = null);

  let  tray = new Tray(path.join(__dirname,'./chart.png' ));
  let widgetWindow = new BrowserWindow({ 
    width: 400, 
    height: 400,
    fullscreenable: false,
    resizable: false,
    autoHideMenuBar: true,
  });
  const widgetUrl = isDev ? 'http://localhost:3000/widget' :
    `file://${path.join(__dirname, '../build/index.html')}`;

  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Quitter', 
      type: 'normal',  
      click () {
        tray.destroy();
      } 
  },
  ]);
  tray.setContextMenu(contextMenu);

  widgetWindow.loadURL(widgetUrl);
  TrayWindow.setOptions({tray: tray,window: widgetWindow});

}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
 
  if (process.platform !== 'darwin') { app.quit() }
})
app.on('activate', () => {
 
  if (mainWindow === null) { createWindow() }
})

