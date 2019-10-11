const {
    HTTP,
    GlassesOptions
} = require('../config/config');

const fs = require('fs');

const express = require('express');
const glasses = express();

var bodyParser = require('body-parser');


const port = (HTTP.port ? HTTP.port : [80]);

glasses.set('view engine', 'ejs');
glasses.set('views', './pages');

//Middle Wares
glasses.use(bodyParser.urlencoded({extended:true}));
glasses.use(bodyParser.json());
glasses.use(require('./middleware/vhost'));
glasses.use(require('./middleware/ipban'));
glasses.use(require('./middleware/options'));
glasses.use(require('./middleware/get_post_params'));
glasses.use(require('./middleware/init'));

const glassesRouter = require('./router');

glasses.use('/', glassesRouter);
glasses.use(require('./middleware/error'));

for (var i=0; i < port.length; i++) {
    glasses.listen(port[i]);
}

console.log('Glasses is listening on port(s): ' + port);