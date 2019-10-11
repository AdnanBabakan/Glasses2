const {GlassesOptions} = require('../config/config');
const express = require('express');
const mime = require('mime-types');
const imgMimeTypes = require('./img_mime_types');
const SJSParser = require('../sjs/parser');

Array.prototype.last = function() {
    return this[this.length-1];
};

var router = express.Router();

router.all(/(.*?)/, function (req, res) {
    var fs = require('fs');
    var url = req.originalUrl.substring(1).split('?')[0];
    var _GET = res.locals.GET;

    var content;
    if (url == '') {
        content = res.locals.vhost.path + res.locals.vhost.config.firstPage;
    } else {
        content = res.locals.vhost.path + url;
    }

    if (fs.existsSync(content)) {
        if(content.split('.').last()=='sjs') { //SJS Files

            content = fs.readFileSync(content, 'utf8');

            var toSJS = {
                _GET: res.locals.GET,
                _POST: res.locals.POST
            };

            var SJSResult = SJSParser(content, toSJS);

            res.writeHead(SJSResult.statusCode, SJSResult.headers);
            res.write(SJSResult.finalContent);
        
        } else { //Normal Files
            var contentType = mime.lookup(content);
            var charset = mime.charset(contentType);
            if(imgMimeTypes.includes(contentType)) {
                content = fs.readFileSync(content);
            } else {
                content = fs.readFileSync(content, 'utf8');
            }
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(content);
        }
    } else {
        res.statusCode = 404;
        res.render("404.ejs", {version: GlassesOptions.version});
    }

    res.end();
});

module.exports = router;