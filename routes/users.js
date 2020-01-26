const userRoute = require('express').Router();

const auth = require('../middlewares/auth');

const validation = require('../helpers/validation');

const { getUsers } = require('../controllers/users');


userRoute.get('/users/me', validation.signin, auth, getUsers);


module.exports = userRoute;
