var app = require('app')
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

function openMainWindow() {
  mainWindow = new BrowserWindow({width: 920, height:700});
  mainWindow.loadUrl('https://www.irccloud.com');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.on('will-navigate', function (event, url) {
    event.preventDefault();
    require('shell').openExternal(url);
  });
}

app.on('activate-with-no-open-windows', function () {
  openMainWindow();
});

app.on('ready', function () {
  openMainWindow();
});
