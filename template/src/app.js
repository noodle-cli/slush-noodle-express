'use strict';

const express = require('express');
const config = require('config');
// const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const loggerFormat = (process.env.NODE_ENV === 'development') ? 'dev' : 'combined';
const app = express();
const port = config.port || 3000;

//parse bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
//logging
app.use(logger(loggerFormat));
app.use(cookieParser());

//setting rotuer
app.use('/', require('./apis'));

//handle 404
app.use((req, res, next) => {
  res.status(404).json({ err: 'Not found.' });
});

//error handle
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ err: 'Server error.' });
});

//listen port
app.listen(port);
console.log('Listening on port' + config.port + ',' + 'god bless' + config.name + '!');

module.exports = app;
