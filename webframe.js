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
