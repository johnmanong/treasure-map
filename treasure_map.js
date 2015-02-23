var fs = require('fs');
var config = require('./treasure_map_config');

var treasureMap = {};

// config
var START = config.start;
var TARGET_FILE_NAME = config.targetFileName;
var OUTPUT = config.outputFile;
var IGNORE_DIRS = config.ignoreDirs;


// logic
function huntForTreasure(currentPath, cb) {
  var files = fs.readdirSync(currentPath);

  for (var i in files) {
    // can be file or dir
    var fileName = files[i];

    if (IGNORE_DIRS.indexOf(fileName) !== -1) {
      continue;
    }

    var currentFilePath = currentPath + '/' + files[i];
    var stats = fs.statSync(currentFilePath);

    if (stats.isFile() && fileName === TARGET_FILE_NAME) {
      treasureMap[currentFilePath] = fs.readFileSync(currentFilePath).toString('utf-8');
    }

    if (stats.isDirectory()) {
      huntForTreasure(currentFilePath, cb);
    }
  }
}

function renderTreasureMap() {
  var keys = Object.keys(treasureMap);
  var outputStr = '';
  keys.forEach(function(key) {
    outputStr += renderSection(key, treasureMap[key]);
  });
  return outputStr;
}

function renderSection(filePath, fileContent) {
  var line = '\n---------------------\n';
  var outputStr = line;
  outputStr += filePath;
  outputStr += line;
  outputStr += fileContent;

  return outputStr;
}

function writeTreasureMap() {
  var outputStr = renderTreasureMap();

  fs.writeFile(TARGET_FILE_NAME, outputStr);
}


function main() {
  huntForTreasure(START);
  writeTreasureMap();
}

// main
main();