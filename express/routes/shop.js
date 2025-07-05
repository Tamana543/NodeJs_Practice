const productController = require('../controllers/shop')

const express= require('express');
const Product = require('../modules/product');


const router = express.Router()

router.get('/',productController.getShopPage)

router.get('/products',productController.getProductsShop)

router.get('/products/:productId',productController.getProductBId)

router.get('/cart',productController.getCartShop)

router.get('/order',productController.getOrderShop)

router.get('/chickout',productController.getChickUpShop)

module.exports = router;