const express = require('express')

const router = express.Router() // Create a new router 
// Router is a mini express application that can be used to handle routes and middleware

router.get('/add-product',(req,res,next)=>{
     res.send('<form action="/product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
     next()
})


router.post('/product',(req,res)=>{
     console.log(req.body);
     res.send('<h1>Product Added</h1>') // Send a response to the client
     res.redirect('/') // Redirect the user to the  / route after processing the form submission
})

exports.routes = router ;// Export the router so it can be used in other files