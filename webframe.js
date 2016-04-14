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

window._openChannelPalette = function () {
  jQuery.event.trigger({ type: 'keydown', ctrlKey: true, which: "K".charCodeAt(0) });
};

window._movePrevChannel = function () {
  jQuery.event.trigger({ type: 'keydown', altKey: true, which: 38 });
};

window._moveNextChannel = function () {
  jQuery.event.trigger({ type: 'keydown', altKey: true, which: 40 });
};

window._movePrevUnreadChannel = function () {
  jQuery.event.trigger({ type: 'keydown', altKey: true, shiftKey: true, which: 38 });
};

window._moveNextUnreadChannel = function () {
  jQuery.event.trigger({ type: 'keydown', altKey: true, shiftKey: true, which: 40 });
};

window._movePreviouslySelectedChannel = function () {
  if (oldSelectedChannel !== null)
    oldSelectedChannel.click();
};

function getSelectedChannel () {
  return document.querySelector("#buffers .buffer.selected span[href]")
}

var selectedChannel = null;
var oldSelectedChannel = null;

var docObserver = new MutationObserver(function () {
  var buffers = document.querySelector("#buffers");
  if (buffers !== null) {
    docObserver.disconnect();

    var buffersObserver = new MutationObserver(function () {
      var selected = getSelectedChannel();
      if (selectedChannel !== selected) {
        oldSelectedChannel = selectedChannel;
        selectedChannel = selected;
      }
    });

    buffersObserver.observe(buffers, { attributes: true, attributeFilter: ['class', 'href'], subtree: true });
  }
});

docObserver.observe(document, {subtree: true, attributes: true, childList: true, attributeFilter: ['id'] });
