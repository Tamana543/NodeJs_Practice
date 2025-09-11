const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
const rootDir = require('../util/paths') 
const Product = require('../modules/product')




// if you use this kind of export it will not export a function .
exports.getAddProduct = (req,res,next)=>{
     if(!req.session.isloggedin){
      return res.redirect("/login")
     }

     res.render('admin/edit-products',
          {pageTitle : "Add Product",
          path:'/admin/add-product',
          addProductPage:true,
          editing : "False",
          product : Product,
           isAuthCorrect :req.session.isloggedin
          
     })
      
}

exports.postAddProduct = (req,res)=>{
     const title =req.body.title ;
     const imageUrl =req.body.imageUrl;
     const price  =req.body.price ;
     const description  =req.body.description ;
    // using MangoDb
     const productData = new Product(
          {title : title,
               price:price, description:description,
               imageUrl : imageUrl,
               // productId : req.user,
          userId : req.user})

     productData.save().then(result => {// remember while using mangoose you do not need to add the save methood on your product module, mangoos contain it itself 
          //  console.log(result)
         res.redirect('/admin/products')})
         .catch(err=> console.log(err)) 
}
exports.showAdminProducts = (req,res)=>{
   //using Mangodb
     // Product.fetchALL()
     // using mongoose 
     Product.find()
     .then(product=>{
           res.render('admin/products',{
               prods : product ,
               pageTitle : 'Admin products',
               path: '/admin/products',
                 isAuthCorrect : req.session.isloggedin
               })
     }).catch(err=>console.log(err))
}



exports.getEditProduct = (req,res,next)=>{
     const editMode = req.query.edit;
     if(!editMode){
          return res.redirect('/')
     }
     // console.log("Received product ID:", req.params.productID);
     // console.log("Edit mode:", req.query.edit);
     const ProductId = req.params.productId;
  
// for mongodb && mongoose
Product.findById(ProductId).then(product => {
          
           if (!product) {
             return res.redirect('/');
           }
           res.render('admin/edit-products', {
             pageTitle: 'Edit Product',
             path: '/admin/edit-product',
             editing: editMode,
             product: product,
              isAuthCorrect : req.session.isloggedin
           });
         })
         .catch(err => console.log("hereeee",err));

}

exports.postEditedProduct = (req,res,next)=>{
     const prodID = req.body.prodId;
     const updatedTitle = req.body.title;
     const updatedPrice = req.body.price;
     const updatedImageUrl = req.body.imageUrl;
     const updatedDescription = req.body.description;
    
     // for mongo db
     // const productUpDet = new Product(updateeTitle,updatedImageUrl,updatedPrice,updatedDescription, prodID)
     // with mongoose 
     Product.findById(prodID)
          .then(product=>{
               product.title = updatedTitle;
               product.imageUrl = updatedImageUrl;
               product.price = updatedPrice;
               product.description = updatedDescription
     return product.save()
     }).then(result=>{
          console.log("Product Updated");
           res.redirect('/admin/products')
     }).catch(err=>console.log(err))
}

exports.postDeleteProduct = (req,res,next)=>{
   
     const prodId = req.body.productId.trim();

     // using m0ongoose 
     Product.findByIdAndRemove(prodId).then(()=>{
          // console.log(product);
          console.log("Deleted");
            res.redirect('/admin/products')

          }).catch(err=>console.log(err))
     // using mangodb : 


     //   Product.deleteProd(prodId).then(()=>{
     //      // console.log(product);
     //      console.log("Deleted");
     //        res.redirect('/admin/products')

     //      }).catch(err=>console.log(err))
}