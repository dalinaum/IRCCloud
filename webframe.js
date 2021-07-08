var webFrame = require('web-frame');

window._zoomIn = function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1);
};

window._zoomOut = function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1);
};

window._zoomActualSize = function() {
  webFrame.setZoomFactor(1);
};

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var linkMenu = new Menu();

linkMenu.append(new MenuItem({
  label: 'Open Link',
  accelerator: 'CommandOrControl+O',
  click: function (evt) {
    window.open(document.activeElement.href);
  }
}));

linkMenu.append(new MenuItem({
  label: 'Copy Link',
  accelerator: 'CommandOrControl+C',
  click: function (evt) {
    require('electron').clipboard.writeText(document.activeElement.href);
  }
}));

window.addEventListener('contextmenu', function (event) {
  if (document.activeElement.tagName == 'A' && document.activeElement.href.length > 0) {
    event.preventDefault();
    linkMenu.popup(remote.getCurrentWindow());
  }
}, false);
