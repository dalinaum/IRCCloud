#!/usr/bin/env node
var packager = require('electron-packager');
var proc = require('child_process');

var distFile = process.argv[2] + "-linux-" + process.argv[3] + ".tar.gz"
var opts = {
  "dir": ".",
  "name": process.argv[2],
  "platform": "linux",
  "arch": "x64",
  "version": "0.28.3",
  "out": "build",
  "prune": 1,
  "asar": 1,
  "ignore": "(resources|dist)",
  "app-version": process.argv[3]
};
packager(opts, function done (err, appPath) { });

proc.spawn("tar",["cvzf", distFile, "build/" + process.argv[2] + "-linux"]);

proc.spawn("mv",[distFile, "dist"]);
