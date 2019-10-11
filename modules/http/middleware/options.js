const {DefaultOptions} = require('../../config/config');

function extend(dest, src) {
    for(var key in src) {
        dest[key] = src[key];
	}
	return dest;
}

module.exports = function(req, res, next) {
    var fs = require('fs');
    var dop = Object.assign({}, DefaultOptions);
    res.locals.vhost.config = extend(dop, res.locals.vhost.config);
    next();
};