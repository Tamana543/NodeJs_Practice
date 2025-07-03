const productController = require('../controllers/shop')

const express= require('express');


const router = express.Router()

router.get('/',productController.getShopPage)

module.exports = router;