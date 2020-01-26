const userRoute = require('express').Router();

const { getUsers } = require('../controllers/users');

userRoute.get('/users/me', getUsers);


module.exports = userRoute;
