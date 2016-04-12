var webFrame = require('web-frame');
var ipc = require("ipc");

(function() {
  var webFrameSetZoomFactor = webFrame.setZoomFactor;
  webFrame.setZoomFactor = function () {
    var oldZoom = webFrame.getZoomFactor();
    var ret = webFrameSetZoomFactor.apply(this, arguments);

    if (oldZoom != webFrame.getZoomFactor())
      ipc.send("zoom-factor-changed", webFrame.getZoomFactor());

    return ret;
  };
})();

window._zoomIn = function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1);
};

window._zoomOut = function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1);
};

window._zoomActualSize = function() {
  webFrame.setZoomFactor(1);
};
