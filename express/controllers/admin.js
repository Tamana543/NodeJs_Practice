const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
const rootDir = require('../util/paths') 
const Product = require('../modules/product')
const { timeLog } = require('console')
// if you use this kind of export it will not export a function .
exports.getAddProduct = (req,res,next)=>{

     res.render('admin/edit-products',
          {pageTitle : "Add Product",
          path:'/admin/add-product',
          addProductPage:true,
          editing : "False",
          product : Product
          
     })
          // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
          // res.sendFile(path.join(__dirname,'../','Views','add-product.html'))// there is a probem with it, it do not work for Linux or ther Os , as they start with \ not / so
          // res.sendFile(path.join(rootDir,'Views','add-product.html')) // Use the rootDir utility to get the correct path to the Views directory
          // next()
}
exports.showAdminProducts = (req,res)=>{
     Product.fetchAll().then(([row,fileContent])=>{

          // console.log(products);
          res.render('admin/products',{
               prods : row ,
               pageTitle : 'Admin Add products',
               path: '/admin/products',
               
               })
  
     }).catch(err=> console.log(err))
    
}

exports.getEditProduct = (req,res,next)=>{
     const editMode = req.query.edit;
     const ProductId = req.params.productID;
     console.log(req.query);
     if(editMode  !== "true"){
          return res.redirect('/')
     }
     // console.log("Received product ID:", req.params.productID);
     // console.log("Edit mode:", req.query.edit);
     Product.findById(ProductId,(product)=>{
     if(!product){
          return res.redirect("/")
     }
          res.render('admin/edit-products',{

               pageTitle : "Edit Product",
               path:'/admin/edit-product',
               addProductPage: true,
               editing : editMode,
               product : product
          })
     })
    
}

exports.postEditedProduct = (req,res,next)=>{
     const prodID = req.body.prodId;
     const updateeTitle = req.body.title;
     const updatedImageUrl = req.body.imageUrl;
     const updatedPrice = req.body.price;
     const updatedDescription = req.body.description;
     const updatedProduct= new Product(prodID,updateeTitle,updatedImageUrl,updatedPrice,updatedDescription)
     updatedProduct.save()
     res.redirect('/admin/products')


}

exports.postAddProduct = (req,res)=>{
     const title =req.body.title ;
     const price  =req.body.price ;
     const imageUrl =req.body.imageUrl;
     const description  =req.body.description ;
     console.log("Hereeeeee",imageUrl,price);
     
     // updating data table by using sql :
     // const product = new Product(null,title,imageUrl,price,description);
     // product.save().then(()=>{
     //      res.redirect('/') // Redirect the user to the  / route after processing the form submission
     // }).catch(err=>{
     //      console.log(err);
     // })
     
// updating product by using sequalizer 
Product.create({
     title : title,
     price:price,
     imageUrl:imageUrl,
     description : description,

}).then(result =>{
     console.log(result);
}).catch(err=>{
     console.log('from here',  err);
})
}
exports.postDeleteProduct = (req,res,next)=>{
   
     const prodId = req.body.productId;
 
     Product.deleteById(prodId)
     res.redirect('/products')
}