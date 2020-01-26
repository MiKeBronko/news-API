const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const isEmail = require('validator/lib/isEmail');

const Error401 = require('../errors/err-401');

const errMessage = require('../variables/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});


userSchema.statics.findUserByCredentials = function comp(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error401(errMessage[404].access));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error401(errMessage[404].access));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
