const router = require('express').Router();

const { login, createUser } = require('../controllers/users');

const errMessage = require('../variables/messages');

const articleRoute = require('./articles');
const userRoute = require('./users');
const valid = require('../helpers/validation');

const Error404 = require('../errors/err-404');

router.post('/signup', valid.signup, createUser);
router.post('/signin', valid.signin, login);

router.use('/', userRoute)
  .use('/', articleRoute)
  .use('*', (req, res, next) => {
    next(new Error404(errMessage[404].source));
  });

module.exports = router;
