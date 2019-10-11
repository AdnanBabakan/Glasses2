const {GlassesOptions} = require('../../config/config');

const logger = require('../../log/log');

module.exports = function (err, req, res, next) {
    res.statusCode = 500;
    logger(req.get('host'), res.statusCode, err);
    res.render("500.ejs", {
        version: GlassesOptions.version,
        error: (GlassesOptions.debug ? err : 'If you want to see the error here turn the debug mode on.')
    });
    res.end();
};