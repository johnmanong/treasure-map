var extend = require('util')._extend;


var config = {
  start: '.'
  targetFileName: 'README.x.md',
  outputFile: './output/README.x.md',
  ignoreDirs: []
};

var userConfig = {
  start: './test',
  ignoreDirs: [ 'build' ]
};

// extend defaults
config = extend(config, userConfig);

module.exports = config;
