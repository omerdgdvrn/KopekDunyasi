let express = require('express');
let app = express();
let HomeController = require('./HomeController');
let PostController = require('./PostController');
let cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
    ],
    allowedHeaders: [
        'Content-Type',
    ],
};
app.use(cors(corsOpts));
app.use('/home', HomeController);
app.use('/post', PostController);
module.exports = app;
