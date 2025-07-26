const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
const rootDir = require('../util/paths') 
const Product = require('../modules/product')
const { timeLog } = require('console')
const { where } = require('sequelize')
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

exports.postAddProduct = (req,res)=>{
     const title =req.body.title ;
     const price  =req.body.price ;
     const imageUrl =req.body.imageUrl;
     const description  =req.body.description ;
     // updating product by using sequalizer (User)
     console.log(req.user);
     req.user.createProduct({
          title: title,
         price: price,
         imageURL: imageUrl,
         description: description }
     ).then((result)=>{
          res.redirect('/admin/products')
     }).catch(err=>console.log("THen HEREEE",err))
     // updating product by using sequalizer 
     //   Product.create({
     //     title: title,
     //     price: price,
     //     imageURL: imageUrl,
     //     description: description,
     //     userId:req.user.id
     //   })
     //     .then(result => {
     //       // console.log(result)
     //     res.redirect('/admin/products')
     //     })
     //     .catch(err => {
     //       console.log(err);
     //     });

     
     // updating data table by using sql :
     // const product = new Product(null,title,imageUrl,price,description);
     // product.save().then(()=>{
     //      res.redirect('/') // Redirect the user to the  / route after processing the form submission
     // }).catch(err=>{
     //      console.log(err);
     // })
     
}
// exports.showAdminProducts = (req,res)=>{
//      // using SQL (and from file)
//      // Product.fetchAll().then(([row,fileContent])=>{

//      //      // console.log(products);
//      //      res.render('admin/products',{
//      //           prods : row ,
//      //           pageTitle : 'Admin Add products',
//      //           path: '/admin/products',
               
//      //           })
  
//      // }).catch(err=> console.log(err))

//      Product.findAll().then(products =>{
//           res.render('admin/products',{
//                prods : products,
//                pageTitle : 'Admin Add products',
//                path: '/admin/products',
               
//                })
  
//      }).catch(err=>{
//           console.log(err);
//      })
    
// }

// exports.getEditProduct = (req,res,next)=>{
//      const editMode = req.query.edit;
//      if(editMode  !== "true"){
//           return res.redirect('/')
//      }
//      // console.log("Received product ID:", req.params.productID);
//      // console.log("Edit mode:", req.query.edit);
//      const ProductId = req.params.productID;
//      // console.log(ProductId);
//      // req.user.createProduct({where : {id :ProductId}}) 
     
//     req.user.getProducts({where : {id : ProductId}}).then(products => {
//           const product = products[0]
//            if (!product) {
//              return res.redirect('/');
//            }
//            res.render('admin/edit-products', {
//              pageTitle: 'Edit Product',
//              path: '/admin/edit-product',
//              editing: editMode,
//              product: product
//            });
//          })
//          .catch(err => console.log("hereeee",err));
// //     Product.findAll({where: {id : ProductId}}).then(product => {
// //            if (!product) {
// //              return res.redirect('/');
// //            }
// //            try {
               
// //                 res.render('admin/edit-product', {
// //                   pageTitle: 'Edit Product',
// //                   path: '/admin/edit-products',
// //                   editing: editMode,
// //                   product: product
// //                 });
// //            } catch (err) {
// //                console.log("Look Here ", err);
// //            }
// //          })
// //          .catch(err => console.log(err));
// }

// exports.postEditedProduct = (req,res,next)=>{
//      const prodID = req.body.prodId;
//      const updateeTitle = req.body.title;
//      const updatedImageUrl = req.body.imageUrl;
//      const updatedPrice = req.body.price;
//      const updatedDescription = req.body.description;
//      //with sequalizer 

//      req.user.getProducts({where: {id:prodID}}).then((products)=>{
//           const product = products[0]
//           product.title = updateeTitle,
//           product.price = updatedPrice,
//           product.description = updatedDescription,
//           product.imageURL = updatedImageUrl 
//           return product.save()

// }).then(

//           res.redirect('/admin/products')

//      ).catch(err=> console.log(err))
// //with SQL
//      // const updatedProduct= new Product(prodID,updateeTitle,updatedImageUrl,updatedPrice,updatedDescription)
//      // updatedProduct.save() 


// }

// exports.postDeleteProduct = (req,res,next)=>{
   
//      const prodId = req.body.productId;
//      //using sequalizer
//      Product.findByPk(prodId).then(product=>{
//           product.destroy()
//      }).then(()=>{
//                 console.log("Done")
//            res.redirect('/admin/products')

//      }).catch(err => console.log(err))
//  // using sql 
//      // Product.deleteById(prodId)
// }