const express = require('express');
const { shopingController } = require('../controllers');
const router = express.Router();
const authGuard = require('../middlewares/AuthGuard');


router.post('/',authGuard, shopingController.createShopingCart)



module.exports = router;