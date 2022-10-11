const electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;
   
const path = require('path'),
  isDev = require('electron-is-dev');
   
let mainWindow;
const TrayWindow = require("electron-tray-window");
const {Tray} = require("electron") 
  
const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1064, height: 768 })
  const appUrl = isDev ? 'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(appUrl)
  mainWindow.maximize()
  mainWindow.on('closed', () => mainWindow = null);

  widgetWindow = new BrowserWindow({ width:340, height: 400});
  const widgetUrl = isDev ? 'http://localhost:3000/widget' :
  `file://${path.join(__dirname, '../build/widget.html')}`
  
  let tray = new Tray();
  trayWindow.setOptions({tray: tray, window: widgetWindow});
  
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
 
  if (process.platform !== 'darwin') { app.quit() }
})
app.on('activate', () => {
 
  if (mainWindow === null) { createWindow() }
})

