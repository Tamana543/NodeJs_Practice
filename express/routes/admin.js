const express = require('express')
const productController = require('../controllers/admin')

const router = express.Router() // Create a new router 
// Router is a mini express application that can be used to handle routes and middleware
router.get('/add-product',productController.getAddProduct)


router.post('/add-product', productController.postAddProduct)

router.get('/products', productController.showAdminProducts)

// router.get('/edit-product/:productID', productController.getEditProduct)

// router.post('/edit-product', productController.postEditedProduct)

// router.post('/delete-product',productController.postDeleteProduct)
// admin/edit-products
module.exports = router ;// Export the router so it can be used in other files// it returns a function 

