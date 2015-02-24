var extend = require('util')._extend;


var config = {
  startDirs: [ '.' ],
  targetFileName: 'README.x.md',
  outputFile: './output/README.x.md',
  ignoreDirs: []
};

var userConfig = {
  startDirs: [ './test' ],
  ignoreDirs: [ 'build' ]
};

// extend defaults
config = extend(config, userConfig);

module.exports = config;
