require('dotenv').config();
const express = require('express');

const helmet = require('helmet');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const config = require('./config/config');

const { NODE_ENV, DBPATH } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(NODE_ENV === 'production' ? DBPATH : config.mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(require('./middlewares/limiter'));

app.use(helmet());
app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/centralErrors'));

module.exports = app;
