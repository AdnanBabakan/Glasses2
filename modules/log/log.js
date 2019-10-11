const {GlassesOptions} = require('../config/config');
const fs = require('fs');

module.exports = function(v, c, m) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    fs.appendFileSync(GlassesOptions.logFile, '{' + v + '}(' + c + ')[' + formatted + '] ' + m + "\n");
}