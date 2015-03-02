var extend = require('util')._extend;


var config = {
  startDirs: [ '.' ],
  targetFileName: 'README.x.md',
  outputFile: 'README.x.md',  // file should exist
  ignoreDirs: []
};

var userConfig = {
  startDirs: [ '../test' ],
  ignoreDirs: [ 'build' ]
};

// extend defaults
config = extend(config, userConfig);

module.exports = config;
