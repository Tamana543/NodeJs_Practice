const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
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

exports.postShopPage = (req,res)=>{
 
     // console.log(products);
     res.render('shop',{prods : product ,
           pageTitle : 'Shop',
          path: '/',
          prodsExist : product.length > 0,
           activeShop: true,
          productCss : true})// to render the default templates of shop.pug based the default tecmplate, and sinding the dynamic data (I had store and make it map through the js object ) to the pug file 
     // res.sendFile(path.join(rootDir,'Views','shop.html'))// it will send this file as a respond so that it will bw shown in page. a : __dirname mean chick the folder that I write this code on its file  b : '../' as the dir point on main folder and we need to go up , c: Views the secpnd port in URL , d: the last port of the url and the file
     }