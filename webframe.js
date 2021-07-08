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

var copyMenu = new Menu();
copyMenu.append(new MenuItem({
  label: 'Copy',
  accelerator: 'CommandOrControl+C',
  role: 'copy'
}));

var pasteMenu = new Menu();
pasteMenu.append(new MenuItem({
  label: 'Paste',
  accelerator: 'CommandOrControl+V',
  role: 'paste'
}));

var inputSelectionMenu = new Menu();
inputSelectionMenu.append(copyMenu.items[0]);
inputSelectionMenu.append(new MenuItem({
  label: 'Cut',
  accelerator: 'CommandOrControl+X',
  role: 'cut'
}));
inputSelectionMenu.append(pasteMenu.items[0]);

window.addEventListener('contextmenu', function (event) {
  var clickedElement = document.activeElement;
  var anySelection = (document.getSelection().toString().length > 0);

  if (clickedElement.tagName == 'INPUT' || clickedElement.tagName == 'TEXTAREA') {
    event.preventDefault();
    console.log(document.getSelection().toString())

    if (!clickedElement.disabled) {
      var menu = anySelection ? inputSelectionMenu : pasteMenu;
      menu.popup(remote.getCurrentWindow());
    } else if (anySelection) {
      copyMenu.popup(remote.getCurrentWindow());
    }
  } else if (anySelection) {
    event.preventDefault();
    copyMenu.popup(remote.getCurrentWindow());
  } else if (clickedElement.tagName == 'A' && clickedElement.href.length > 0) {
    event.preventDefault();
    linkMenu.popup(remote.getCurrentWindow());
  }
}, false);
