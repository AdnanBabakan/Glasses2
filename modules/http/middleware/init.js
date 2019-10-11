const {GlassesOptions} = require('../../config/config');

module.exports = function(req, res, next) {
    res.setHeader('X-Powered-By', 'Glasses - v' + GlassesOptions.version);
    res.setHeader('Glasses-Website', 'http://github.com/AdnanBabakan/Glasses');
    next();
};