const jwt = require('jsonwebtoken');

require('dotenv').config();

const config = require('../config/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const Error401 = require('../errors/err-401');

const errMessage = require('../variables/messages');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error401(errMessage[401].auth);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.secret);
  } catch (err) {
    throw new Error401(errMessage[401].auth);
  }
  req.user = { _id: payload._id };
  next();
};
