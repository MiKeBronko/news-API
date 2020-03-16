// import { corsOptionsDelegate, cors } from '../helpers/cors';

const router = require('express').Router();

const { corsOptionsDelegate, cors } = require('../helpers/cors');

const { login, createUser } = require('../controllers/users');

const errMessage = require('../variables/messages');

const articleRoute = require('./articles');
const userRoute = require('./users');
const valid = require('../helpers/validation');

const Error404 = require('../errors/err-404');

router.post('/signup', cors(corsOptionsDelegate), valid.signup, createUser);
router.post('/signin', cors(corsOptionsDelegate), valid.signin, login);

router.use('/', cors(corsOptionsDelegate), userRoute)
  .use('/', cors(corsOptionsDelegate), articleRoute)
  .use('*', cors(corsOptionsDelegate), (req, res, next) => {
    next(new Error404(errMessage[404].source));
  });

module.exports = router;
