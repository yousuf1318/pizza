const express = require('express');
const { menuController } = require('../controllers');
const router = express.Router();
const authGuard = require('../middlewares/AuthGuard');

router.post('/', menuController.createMenu)
router.get('/',authGuard, menuController.getMenu)


module.exports = router;