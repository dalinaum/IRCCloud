#!/usr/bin/env node

var App = require('app');
var BrowserWindow = require('browser-window');
var ConfigStore = require('configstore');
var Menu = require('menu');
var Shell = require('shell');
var IPC = require('electron').ipcMain;

require('crash-reporter').start();

var conf = new ConfigStore('IRCCloud');

App.once('ready', function() {
  var template;
  if (process.platform == 'darwin') {
    template = [
      {
        label: 'IRCCloud',
        submenu: [
          {
            label: 'About IRCCloud',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide IRCCloud',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
              App.quit();
            }
          },
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.reload();
              }
            }
          },
          {
            label: 'Zoom In',
            accelerator: 'Command+=',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow && focusedWindow.webContents) {
                focusedWindow.webContents.executeJavaScript('_zoomIn()');
              }
            }
          },
          {
            label: 'Zoom Out',
            accelerator: 'Command+-',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow && focusedWindow.webContents) {
                focusedWindow.webContents.executeJavaScript('_zoomOut()');
              }
            }
          },
          {
            label: 'Actual Size',
            accelerator: 'Command+0',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow && focusedWindow.webContents) {
                focusedWindow.webContents.executeJavaScript(
                  '_zoomActualSize()');
              }
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
              }
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.toggleDevTools();
              }
            }
          },
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          },
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click: function() {
              Shell.openExternal('https://github.com/dalinaum/IRCCloud');
            }
          },
          {
            label: 'Search Issues',
            click: function() {
              Shell.openExternal('https://github.com/dalinaum/IRCCloud/issues');
            }
          }
        ]
      }
    ];
  } else {
    template = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.close();
              }
            }
          },
        ]
      },
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.reload();
              }
            }
          },
          {
            label: 'Zoom In',
            accelerator: 'Ctrl+=',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow && focusedWindow.webContents) {
                focusedWindow.webContents.executeJavaScript('_zoomIn()');
              }
            }
          },
          {
            label: 'Zoom Out',
            accelerator: 'Ctrl+-',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow && focusedWindow.webContents) {
                focusedWindow.webContents.executeJavaScript('_zoomOut()');
              }
            }
          },
          {
            label: 'Actual Size',
            accelerator: 'Ctrl+0',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow && focusedWindow.webContents) {
                focusedWindow.webContents.executeJavaScript(
                  '_zoomActualSize()');
              }
            }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
              }
            }
          },
          {
            label: 'Toggle &Menu Bar',
            accelerator: 'Ctrl+Shift+M',
            click: function() {
              App.emit('toggle-menu-bar');
            }
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: function() {
              var focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.toggleDevTools();
              }
            }
          },
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click: function() {
              Shell.openExternal('https://github.com/dalinaum/IRCCloud');
            }
          },
          {
            label: 'Search Issues',
            click: function() {
              Shell.openExternal('https://github.com/dalinaum/IRCCloud/issues');
            }
          }
        ]
      }
    ];
  }

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

var mainWindow = null;

App.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    App.quit();
  }
});

function hideMenuBar(window) {
  window.setAutoHideMenuBar(true);
  window.setMenuBarVisibility(false);
}

function showMenuBar(window) {
  window.setAutoHideMenuBar(false);
  window.setMenuBarVisibility(true);
}

function openMainWindow() {
  mainWindow = new BrowserWindow({
    width: conf.get('width') || 920,
    height: conf.get('height') || 700,
    webPreferences: { zoomFactor: conf.get('zoom_factor') || 1.0 },
    preload: __dirname + '/webframe.js',
    icon: __dirname + 'resources/icon.iconset/icon_512x512.png',
    title: 'IRCCloud'
  });

  mainWindow.loadURL('https://www.irccloud.com');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window',
    function (event, url, frameName, disposition) {
      event.preventDefault();
      Shell.openExternal(url);
    });

  mainWindow.on('will-navigate', function (event, url) {
    event.preventDefault();
    Shell.openExternal(url);
  });

  if (conf.get('maximize')) {
    mainWindow.maximize();
  }

  // Handle sizing events so we can persist them.
  mainWindow.on('maximize', function (event) {
    conf.set('maximize', true);
  });

  mainWindow.on('unmaximize', function (event) {
    conf.set('maximize', false);
  });

  mainWindow.on('resize', function (event) {
    var size = this.getSize();
    conf.set({
      width: size[0],
      height: size[1]
    });
  });

  if (conf.get('menu-bar') === false) {
    hideMenuBar(mainWindow);
  }
}

App.on('activate-with-no-open-windows', function () {
  openMainWindow();
});

App.on('ready', function () {
  openMainWindow();
});

App.on('toggle-menu-bar', function () {
  if (mainWindow.isMenuBarAutoHide()) {
    showMenuBar(mainWindow);
    conf.set('menu-bar', true);
  } else {
    hideMenuBar(mainWindow);
    conf.set('menu-bar', false);
  }
});

IPC.on('zoom-factor-changed', function(event, zoom) {
  conf.set({ zoom_factor: zoom });
});
