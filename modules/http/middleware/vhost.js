const {
    vhost,
    GlassesOptions,
    DefaultOptions
} = require('../../config/config');
const logger = require('../../log/log');
const toml = require('toml');

module.exports = function (req, res, next) {
    const fs = require('fs');
    var host = req.get('host').split(':')[0];
    if (vhost[host]) {
        res.locals.vhost = { domain: host };
        res.locals.vhost.path = './' + GlassesOptions.hostsFolder + '/' + vhost[host].directory + '/';
        res.locals.vhost.config = {};
        res.locals.vhost.config.blockedIP = [];
        if(fs.existsSync(res.locals.vhost.path + '.conf')) { res.locals.vhost.config = toml.parse(fs.readFileSync(res.locals.vhost.path + '.conf', 'UTF8')); }
        next();
    } else {
        res.statusCode = 501;
        logger(host, res.statusCode, 'This host does not exist');
        res.render("901.ejs", {
            version: GlassesOptions.version,
            host: host
        });
        res.end();
    }
}