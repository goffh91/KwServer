/** basic requirement */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

/** user requirement */
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

module.exports = exports = (app) => {
    app.set('views', path.resolve(__dirname, '../view'));
    app.engine('jsx', require('express-react-views').createEngine({ beautify: true }));
    app.set('view engine', 'jsx');

    app.use(cookieParser());
    app.use(express.static(path.resolve(__dirname, '../../public')));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(helmet());
    app.disable('x-powered-by');
    app.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) return false
            return compression.filter(req, res)
        }
    }));
};
