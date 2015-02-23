var extend = require('util')._extend;


var config = {
  start: './test',
  pattern: 'README.x.md',
  outputFile: './output/README.x.md',
  ignoreDirs: []
};

var userConfig = {
  ignoreDirs: [ 'build' ]
};

// extend defaults
config = extend(config, userConfig);

module.exports = config;
