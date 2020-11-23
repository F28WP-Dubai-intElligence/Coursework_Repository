const express = require('express');
//const app = express();
const userController = require('../controllers/userController');


//define a router and create routes
const myRouter = express.Router();
//create a route for /api/login
myRouter.post('/api/register', userController.registerCtrl);
//create a route for /api/login
myRouter.post('/api/login', userController.loginCtrl);


//export router
module.exports = myRouter;