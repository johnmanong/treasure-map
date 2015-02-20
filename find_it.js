var fs = require('fs');

var treasureMap = {};

// config
var START = './test';
var PATTERN = 'README.x.md'
var OUTPUT = './output/README.x.md'


// util
function huntForTreasure(currentPath, cb) {
  var files = fs.readdirSync(currentPath);

  for (var i in files) {
    // can be file or dir
    var fileName = files[i]
    var currentFilePath = currentPath + '/' + files[i];
    var stats = fs.statSync(currentFilePath);

    if (stats.isFile() && fileName === PATTERN) {
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
    console.log(key);
    outputStr += renderSection(key, treasureMap[key]);
  });

  fs.writeFile(PATTERN, outputStr);
}

function renderSection(filePath, fileContent) {
  var line = '\n---------------------\n';
  var outputStr = line;
  outputStr += filePath;
  outputStr += line;
  outputStr += fileContent;

  return outputStr;
}


function main() {
  huntForTreasure(START);
  renderTreasureMap();
}

// main
main();