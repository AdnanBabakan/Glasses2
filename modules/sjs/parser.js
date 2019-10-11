const {
    GlassesOptions
} = require('../config/config');
const regexDict = require('./regex_dict');
const jsEval = require('eval');
const extras = require('./extras');

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

module.exports = function (d, t) {
    var finalContent = '';

    var statusCode = 200;
    var headers = {
        'Content-Type': 'text/html; charset=' + GlassesOptions.charset + ';'
    };

    var finalCode = '';
    d = regexDict(d);

    var SJSFuncs = {
        echo(d) {
            finalContent += d;
        },
        jsonEcho(d) {
            headers['Content-Type'] = 'application/json';
            finalContent += JSON.stringify(d);
        },
        glasses: {
            log(d) {
                console.log(d);
            },
            setHeader(c, h) {
                statusCode = c;
                headers = h;
            }
        },
        ...t,
        ...extras
    };

    jsEval(d, 'SJS', SJSFuncs, true);

    return {
        finalContent,
        statusCode,
        headers
    };
};