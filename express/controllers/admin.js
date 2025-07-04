const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
const rootDir = require('../util/paths') 
const Product = require('../modules/product')
// if you use this kind of export it will not export a function .
exports.getAddProduct = (req,res,next)=>{

     res.render('admin/add-product',{pageTitle : "Add Product",
          path:'/admin/add-product',
          addProductPage:true,
          productCss : true , 
          formCss:true})
     // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
     // res.sendFile(path.join(__dirname,'../','Views','add-product.html'))// there is a probem with it, it do not work for Linux or ther Os , as they start with \ not / so
// res.sendFile(path.join(rootDir,'Views','add-product.html')) // Use the rootDir utility to get the correct path to the Views directory
     // next()
}


exports.showAdminProducts = (req,res)=>{
Product.fetchAll(product=>{

           // console.log(products);
           res.render('admin/products',{
               prods : product ,
                 pageTitle : 'Admin Add products',
                path: '/admin/products',
               
               })
      })
}
exports.postAddProduct = (req,res)=>{
     const title =req.body.title ;
     const imageUrl =req.body.imageUrl;
     const price  =req.body.price ;
     const description  =req.body.description ;
   const product = new Product(title,imageUrl,price,description);
   console.log(product);
product.save()

     res.redirect('/') // Redirect the user to the  / route after processing the form submission
}