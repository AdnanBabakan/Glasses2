module.exports = function (d) {

    var finalCode = '';

    // Echo Shortcut
    d = d.replace(/\${{(.*?)}}/gi, function (c, m) {
        return '<script run>echo(' + m + ');</script>';
    });

    //Function return type
    d = d.replace(/function (.*) {((.|[\r\n])*?)}/gi, function (m) {
        var type = /function (.*) /gi.exec(m.split("\n")[0])[1].split(":")[1];
        var name = /function (.*) /gi.exec(m.split("\n")[0])[1].split(":")[0];
        var returnValue = /return (.*)(?!\s);/gi.exec(m)[1];
        var newReturn = "return ";
        switch (type) {
            default:
                newReturn += returnValue + ';';
                break;
            case 'string':
            case 'str':
                newReturn += 'String(' + returnValue + ');';
                break;
            case 'number':
            case 'int':
                newReturn += 'Number(' + returnValue + ');';
                break;
            case 'boolean':
                var replace = returnValue.replace(/true/gi, 'true').replace(/false/gi, 'false');
                newReturn += (returnValue === "\"true\"" ? "true" : "false") + ';';
                break;
            case 'undefined':
            case 'null':
                newReturn += undefined + ';';
                break;
        }
        var final = m.replace(/return (.*)(?!\s);/, newReturn).replace(/function (.*) /gi, "function " + name + " ");
        return final;
    });

    d = d.replace(/function\((.*?)\):(.*?) {((.|[\r\n])*?)}/gi, function (c, m, n) {
        var returnValue = /return (.*)(?!\s);/gi.exec(c)[1];
        var newReturn = "return ";
        switch (n) {
            default:
                newReturn += returnValue + ';';
                break;
            case 'string':
            case 'str':
                newReturn += 'String(' + returnValue + ');';
                break;
            case 'number':
            case 'int':
                newReturn += 'Number(' + returnValue + ');';
                break;
            case 'boolean':
                var replace = returnValue.replace(/true/gi, 'true').replace(/false/gi, 'false');
                newReturn += (returnValue === "\"true\"" ? "true" : "false") + ';';
                break;
            case 'undefined':
            case 'null':
                newReturn += undefined + ';';
                break;
        }
        var final = c.replace(/return (.*)(?!\s);/, newReturn).replace(/function\((.*?)\):(.*)/gi, 'function(' + m + ') {');
        return final;
    });

    //Leveling functions
    d = d.replace(/\|(.*)\|/gi, function (m, c) {
        var separator = c.split(/(?!\))(?!\s)*>(?!\s*")/gi);
        var till = '';
        for (var i = 0; i < separator.length; i++) {
            till = separator[i].replace(/\$\$/gi, till);
        }
        return till + ';';
    });

    // Final parser
    d = d.split(/(?=<script run>)([\s\S]+?)<\/script>/gi);
    d = d.filter(function (el) {
        return el != '';
    }).filter(function (el) {
        return el != null;
    });
    for (var i = 0; i < d.length; i++) {
        var val = d[i];
        var getSlice = val.slice(0, 12);
        if (getSlice === "<script run>") {
            finalCode += val.replace('<script run>', '');
        } else {
            finalCode += 'echo(`' + val + '`);';
        }
    }
    return finalCode;
}