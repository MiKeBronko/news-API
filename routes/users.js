const userRoute = require('express').Router();

const { getUsers } = require('../controllers/users');

const auth = require('../middlewares/auth');

const validation = require('../helpers/validation');

userRoute.get('/users/me', validation.signin, auth, getUsers);


module.exports = userRoute;
