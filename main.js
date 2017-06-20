'use strict';

const electron = require('electron');
const chokidar = require('chokidar');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

chokidar.watch(['ports.js', 'index.html', 'elm.js']).on('change', () => {
  console.log('CHANGE');
  if (mainWindow) {
    mainWindow.reload();
  }
});

app.on('ready', createWindow);

// Specific to mac os x
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});

// If no mainWindow, create one (similar to clicking on the dock)
app.on('activate', () => {
  if (mainWindow === null) { createWindow(); }
});

