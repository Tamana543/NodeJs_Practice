const express = require('express')
const productController = require('../controllers/products')

const router = express.Router() // Create a new router 
// Router is a mini express application that can be used to handle routes and middleware
router.get('/add-product',productController.getAddProduct)


router.post('/add-product', productController.postAddProduct)

exports.routes = router ;// Export the router so it can be used in other files
