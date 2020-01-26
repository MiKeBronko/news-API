const router = require('express').Router();

const errMessage = require('../variables/messages');

const articleRoute = require('./articles');
const userRoute = require('./users');

const Error404 = require('../errors/err-404');


router.use('/', userRoute)
  .use('/', articleRoute)
  .use('*', (req, res, next) => {
    next(new Error404(errMessage[404].source));
  });

module.exports = router;
