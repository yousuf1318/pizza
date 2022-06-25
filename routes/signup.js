const express = require('express');
const { signupController } = require('../controllers');
const router = express.Router();

router.post('/', signupController.createUser)
router.patch('/', signupController.updateUser)
router.delete('/', signupController.deleteUser)
module.exports = router;