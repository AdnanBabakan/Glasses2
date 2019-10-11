const {vhost, GlassesOptions} = require('../../config/config');
const logger = require('../../log/log');

module.exports = function(req, res, next) {
    if(!res.locals.vhost.config.blockedIP) { res.locals.vhost.config.blockedIP = []; }
    if(!res.locals.vhost.config.blockedIP.includes(req.ip)) {
        next();
    } else {
        res.statusCode = 403;
        logger(res.locals.vhost.domain, res.statusCode, 'Blocked IP Access Attempt ' + req.ip);
        res.render("403.ejs", {
            version: GlassesOptions.version,
            ip: req.ip
        });
        res.end();
    }
}