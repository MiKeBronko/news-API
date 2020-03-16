// import { corsOptionsDelegate, cors } from '../helpers/cors';

const userRoute = require('express').Router();

const { corsOptionsDelegate, cors } = require('../helpers/cors');

const auth = require('../middlewares/auth');

const validation = require('../helpers/validation');

const { getUsers } = require('../controllers/users');


userRoute.get('/users/me', cors(corsOptionsDelegate), validation.signin, auth, getUsers);


module.exports = userRoute;
