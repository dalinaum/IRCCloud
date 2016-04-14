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
  jQuery.event.trigger({ type: 'keydown', which: 75, ctrlKey: true }); // Simulate Ctrl+K
}
