const express = require('express');
const router = express.Router();
const {loginController} = require('../controllers');
const authGuard = require('../middlewares/AuthGuard');

router.post('/', loginController.login)

module.exports = router;

// add role guard
// roleGuard(['ADMIN', 'USER'])