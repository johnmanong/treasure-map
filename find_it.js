var fs = require('fs');

var contents = {};
// config
var START = './test';
var PATTERN = 'README.x.md'


// util
function huntForTreasure(currentPath, cb) {
  var files = fs.readdirSync(currentPath);

  for (var i in files) {
    // can be file or dir
    var fileName = files[i]
    var currentFilePath = currentPath + '/' + files[i];
    var stats = fs.statSync(currentFilePath);

    if (stats.isFile() && fileName === PATTERN) {
      contents[currentFilePath] = fs.readFileSync(currentFilePath).toString('utf-8');
    }

    if (stats.isDirectory()) {
      huntForTreasure(currentFilePath, cb);
    }
  }
}


function main() {
  huntForTreasure(START);
}

// main
main();