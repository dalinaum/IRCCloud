var app = require('app')
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function () {
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 920, height:700});
  mainWindow.loadUrl('https://www.irccloud.com');
  // mainWindow.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
