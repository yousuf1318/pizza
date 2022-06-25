const express = require('express');
const router = express.Router();

const signupRoute = require('./signup');
const menuRoute = require('./menu');
const shopingRoute = require('./shopingCart');
const loginRoute = require('./login');
const validation = require('./validate');



router.use('/signup',signupRoute);
router.use('/login', loginRoute);
router.use('/', validation);
router.use('/menu', menuRoute);
router.use('/shoping', shopingRoute);



module.exports = router;