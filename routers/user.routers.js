const express = require('express');
const UserControllers = require('../controllers/user.controllers');

const Oauthrouter = express.Router();

//Oauthrouter.get('/login', UserControllers.loginGet);
Oauthrouter.post('/login', UserControllers.login);
Oauthrouter.get('/register', UserControllers.register);
Oauthrouter.post('/register', UserControllers.registerPost);

module.exports = Oauthrouter;
