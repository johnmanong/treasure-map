// defaults
TreasureMapConfigDefaults = {
  start: './test',
  pattern: 'README.x.md',
  outputFile: './output/README.x.md'
}

// TODO extend defaults
TreasureMapConfig = TreasureMapConfigDefaults;

TreasureMapConfig.ignoreDirs = [
  'build'
];

module.exports = TreasureMapConfig;