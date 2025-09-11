const express = require('express')
const productController = require('../controllers/admin')
const rootAuth = require('../middleware/roots_auth') ;
const router = express.Router() // Create a new router 
// Router is a mini express application that can be used to handle routes and middleware
router.get('/add-product',rootAuth,productController.getAddProduct)


router.post('/add-product', rootAuth, productController.postAddProduct)

router.get('/products', rootAuth, productController.showAdminProducts)

router.get('/edit-product/:productID', rootAuth, productController.getEditProduct)

router.post('/edit-product', rootAuth, productController.postEditedProduct)

router.post('/delete-product', rootAuth,productController.postDeleteProduct)
// admin/edit-products
module.exports = router ;// Export the router so it can be used in other files// it returns a function 

