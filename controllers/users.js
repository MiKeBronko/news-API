const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const config = require('../config/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const Error404 = require('../errors/err-404');

const errMessage = require('../variables/messages');

module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email: req.body.email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id, name, email,
    }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error404(errMessage[404].user);
      }
      return res.send({ user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : config.secret, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
