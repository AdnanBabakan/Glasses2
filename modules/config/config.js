const glob = require('glob');
const fs = require('fs');
var toml = require('toml');

var confFiles = glob.sync('config/**/*.conf');

var config = '';

for(var i=0; i<confFiles.length; i++) {
    config += fs.readFileSync(confFiles[i], 'UTF8') + '\n';
}

config = toml.parse(config);

module.exports = config;