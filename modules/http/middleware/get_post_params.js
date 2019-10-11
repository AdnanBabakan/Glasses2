module.exports = function (req, res, next) {

    //Proxy Handler
    var handler = {
        get(o, p) {
            return (o[p]?o[p]:'Undefined')
        },
        set(o, p, v) {
            o[p] = 'Unchangeable';
        }
    };

    //GET Params
    var g = {};
    var urlParameters = req.originalUrl.substring(1).split('?');
    if (urlParameters.length > 1) {
        urlParameters = urlParameters[1].split('&');
        for (var i = 0; i < urlParameters.length; i++) {
            var arg = urlParameters[i].split('=');
            g[arg[0]] = decodeURI(arg[1]);
        }
        res.locals.GET = new Proxy(g, handler);
    }

    //POST Params
    res.locals.POST = new Proxy(req.body, handler);

    next();
};