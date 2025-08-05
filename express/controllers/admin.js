const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
const rootDir = require('../util/paths') 
const Product = require('../modules/product')



// if you use this kind of export it will not export a function .
exports.getAddProduct = (req,res,next)=>{

     res.render('admin/edit-products',
          {pageTitle : "Add Product",
          path:'/admin/add-product',
          addProductPage:true,
          editing : "False",
          product : Product
          
     })
      
}

exports.postAddProduct = (req,res)=>{
     const title =req.body.title ;
     const price  =req.body.price ;
     const imageUrl =req.body.imageUrl;
     const description  =req.body.description ;
    


     // using MangoDb
     const productData = new Product(title, imageUrl, price, description, null , req.user._id)

     productData.save().then(result => {
          //  console.log(result)
         res.redirect('/admin/products')})
         .catch(err=> console.log(err)) 

    
}
exports.showAdminProducts = (req,res)=>{
   

     //using Mangodb
     Product.fetchALL().then(product=>{
           res.render('admin/products',{
               prods : product ,
               pageTitle : 'Admin products',
               path: '/admin/products',
               
               })
     }).catch(err=>console.log(err))
}



exports.getEditProduct = (req,res,next)=>{
     const editMode = req.query.edit;
     if(editMode  !== "true"){
          return res.redirect('/')
     }
     // console.log("Received product ID:", req.params.productID);
     // console.log("Edit mode:", req.query.edit);
     const ProductId = req.params.productID;
  
// for mongodb
   Product.findById(ProductId).then(product => {
          
           if (!product) {
             return res.redirect('/');
           }
           res.render('admin/edit-products', {
             pageTitle: 'Edit Product',
             path: '/admin/edit-product',
             editing: editMode,
             product: product
           });
         })
         .catch(err => console.log("hereeee",err));

}

exports.postEditedProduct = (req,res,next)=>{
     const prodID = req.body.prodId;
     const updateeTitle = req.body.title;
     const updatedImageUrl = req.body.imageUrl;
     const updatedPrice = req.body.price;
     const updatedDescription = req.body.description;
    
     // for mongo db
     const productUpDet = new Product(updateeTitle,updatedImageUrl,updatedPrice,updatedDescription, prodID)
     
     productUpDet.save().then(result=>{
          console.log("Product Updated");
           res.redirect('/admin/products')
     }).catch(err=>console.log(err))



}

exports.postDeleteProduct = (req,res,next)=>{
   
     const prodId = req.body.productId.trim();
     // using mangodb : 


       Product.deleteProd(prodId).then(()=>{
          // console.log(product);
          console.log("Deleted");
            res.redirect('/admin/products')

          }).catch(err=>console.log(err))



}