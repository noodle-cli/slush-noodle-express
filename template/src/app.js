'use strict';

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const log4js = require('log4js');

const logger = log4js.getLogger("cheese");
const app = express();
const port = config.port || 3000;

//parse bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
//logging
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(cookieParser());

//setting rotuer
app.use('/', require('./apis'));

//handle 404
app.use((req, res, next) => {
  logger.info('Not found.');
  res.status(404);
});

//error handle
app.use((err, req, res, next) => {
  logger.info('Server error.');
  res.status(err.status || 500);
});

//listen port
app.listen(port);
logger.info('Listening on port' + config.port + ',' + 'god bless' + config.name + '!');

module.exports = app;
