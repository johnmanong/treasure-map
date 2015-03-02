var fs = require('fs');
var extend = require('util')._extend;
var config = require('./treasure_map_config');

// config
var START_DIRS = config.startDirs;
var IGNORE_DIRS = config.ignoreDirs;
var TARGET_FILE_NAME = config.targetFileName;
var OUTPUT = config.outputFile;


// logic
function generateTreasureMap() {
  return START_DIRS.reduce(function(currentMap, currentDir) {
    return extend(currentMap, generateTreasureMapForDir(currentDir));
  }, {});
}

function generateTreasureMapForDir(dir) {
  var treasureMap = {};

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

  // start recursive search
  huntForTreasure(dir);

  return treasureMap;
}

function cleanFilePathStr(filePathStr) {
  return filePathStr.substring(2).replace(TARGET_FILE_NAME, '');
}

function renderTreasureMap(treasureMap) {
  var keys = Object.keys(treasureMap);
  var outputStr = '';

  keys.sort();

  outputStr = '## Directory Structure:\n'
  keys.forEach(function(key) {
    outputStr += renderDirectoryReferenceLine(key);
  });

  keys.forEach(function(key) {
    outputStr += renderSection(key, treasureMap[key]);
  });
  return outputStr;
}

function renderDirectoryReferenceLine(dir) {
  var cleanedDir = cleanFilePathStr(dir);
  return ' - ' + renderPageLink(cleanedDir, cleanedDir) + '\n';
}

function renderPageLink(text, targetName) {
  // creates link to somewhere in the page with name matching targetName
  return '[' + text + '](#' + targetName + ')';
}

function renderHeadingWithLink(heading) {
  // heading should be a unique reference so it can be linked to
  return '`' + heading + '`<a name="' + heading + '"></a>\n';
}

function renderSection(filePath, fileContent) {
  var line = '\n---------------------\n';
  var outputStr = line;
  outputStr += renderHeadingWithLink(cleanFilePathStr(filePath));
  outputStr += line;
  outputStr += fileContent;

  return outputStr;
}

function writeTreasureMap(treasureMap) {
  var outputStr = renderTreasureMap(treasureMap);

  fs.writeFile(OUTPUT, outputStr);
}

function main() {
  var treasureMap = generateTreasureMap();
  writeTreasureMap(treasureMap);
}

// main
main();