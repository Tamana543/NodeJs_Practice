const path = require('path')
const express = require('express')

const router = express.Router() // Create a new router 
// Router is a mini express application that can be used to handle routes and middleware

router.get('/add-product',(req,res,next)=>{
     // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
     res.sendFile(path.join(__dirname,'../','Views','add-product.html'))
     // next()
})


router.post('/add-product',(req,res)=>{
     console.log(req.body);
     res.redirect('/') // Redirect the user to the  / route after processing the form submission
})

module.exports = router ;// Export the router so it can be used in other files