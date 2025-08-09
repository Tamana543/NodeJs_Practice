const productController = require('../controllers/shop')

const express= require('express');
const Product = require('../modules/product');


const router = express.Router()

router.get('/',productController.getShopPage)

router.get('/products',productController.getProductsShop)

router.get('/products/:productId',productController.getProductBId)// This way you can add and go through a randum id url and render it based its id, you can name it anything not only productId

// router.get('/cart',productController.getCartShop)

router.post('/cart',productController.postCartShop)
// router.post('/cart-delete-item', productController.postDelCardView)

// router.get('/order',productController.getOrderShop)

// router.post('/order_items',productController.postOrderShop)




module.exports = router;