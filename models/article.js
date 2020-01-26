const mongoose = require('mongoose');

const linkValid = require('../variables/regexp-link');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    lastActiveAt: Date,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    match: linkValid,
    required: true,
  },
  image: {
    type: String,
    match: linkValid,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
