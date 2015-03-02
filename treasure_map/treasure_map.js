var fs = require('fs');
var extend = require('util')._extend;
var config = require('./treasure_map_config');

// config
var START_DIRS = config.startDirs;
var IGNORE_DIRS = config.ignoreDirs;
var TARGET_FILE_NAME = config.targetFileName;
var OUTPUT = config.outputFile;

var LAYOUT = {
  verticalSpacing: '\n<br><br>\n',
  line: '\n---\n',
  newLine: '\n',
}

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
  var relDirPrefix = './';  // TODO from config
  return filePathStr.substring(relDirPrefix.length)
                    .replace(TARGET_FILE_NAME, '');
}

function renderTreasureMap(treasureMap) {
  var keys = Object.keys(treasureMap);
  var outputStr = '';

  keys.sort();

  outputStr += '## Directory Structure:'
  outputStr += LAYOUT.line;
  keys.forEach(function(key) {
    outputStr += renderDirectoryReferenceLine(key);
  });

  outputStr += LAYOUT.verticalSpacing;
  outputStr += LAYOUT.newLine;

  outputStr += '## Notes:'
  outputStr += LAYOUT.line;
  keys.forEach(function(key) {
    outputStr += renderSection(key, treasureMap[key]);
  });
  return outputStr;
}

function renderDirectoryReferenceLine(dir) {
  var cleanedDir = cleanFilePathStr(dir);
  return '\n - ' + renderPageLink(cleanedDir, cleanedDir);
}

function renderPageLink(text, targetName) {
  // creates link to somewhere in the page with name matching targetName
  return '[' + text + '](#' + targetName + ')';
}

function renderHeadingWithLink(heading) {
  // heading should be a unique reference so it can be linked to
  return '`' + heading + '`<a name="' + heading + '"></a>';
}

function renderSection(filePath, fileContent) {
  var outputStr = '';
  outputStr += renderHeadingWithLink(cleanFilePathStr(filePath));
  outputStr += LAYOUT.verticalSpacing;
  outputStr += fileContent;
  outputStr += LAYOUT.verticalSpacing;
  outputStr += LAYOUT.line;

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
