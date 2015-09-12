#!/usr/bin/env node
var proc = require('child_process')

// spawn electron 
var child = proc.spawn("electron",[__dirname])
