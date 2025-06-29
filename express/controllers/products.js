const path = require('path')
const rootDir = require('../util/paths') 

const product = [];
exports.getAddProduct = (req,res,next)=>{
     res.render('add-product',{pageTitle : "Add Product",
          path:'/admin/add-product',
          addProductPage:true,
          productCss : true , 
          formCss:true})
     // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
     // res.sendFile(path.join(__dirname,'../','Views','add-product.html'))// there is a probem with it, it do not work for Linux or ther Os , as they start with \ not / so
// res.sendFile(path.join(rootDir,'Views','add-product.html')) // Use the rootDir utility to get the correct path to the Views directory
     // next()
}
exports.postAddProduct = (req,res)=>{
     product.push({title : req.body.title})
     res.redirect('/') // Redirect the user to the  / route after processing the form submission
}