const rootDir = require('../util/paths') 
const Product = require('../modules/product')


exports.getShopPage = (req,res)=>{
      Product.fetchAll(product=>{

           // console.log(products);
           res.render('shop/index',{
               prods : product ,
                 pageTitle : 'All products',
                path: '/',
                prodsExist : product.length > 0,
                 activeShop: true,
                productCss : true
               })// to render the default templates of shop.pug based the default tecmplate, and sinding the dynamic data (I had store and make it map through the js object ) to the pug file 
           // res.sendFile(path.join(rootDir,'Views','shop.html'))// it will send this file as a respond so that it will bw shown in page. a : __dirname mean chick the folder that I write this code on its file  b : '../' as the dir point on main folder and we need to go up , c: Views the secpnd port in URL , d: the last port of the url and the file
      })
     }
exports.getProductsShop = (req,res)=>{
    Product.fetchAll(product=>{

           // console.log(products);
           res.render('shop/product-list',{
               prods : product ,
                 pageTitle : 'Products',
                path: '/products',
               
               })
      })
     }
exports.getCartShop = (req,res)=>{
    Product.fetchAll(product=>{

           // console.log(products);
           res.render('shop/cart',{
               prods : product ,
                 pageTitle : 'Cart',
                path: '/cart',
               
               })
      })
     }
exports.getOrderShop = (req,res)=>{
    Product.fetchAll(product=>{

           // console.log(products);
           res.render('shop/order',{
               prods : product ,
                 pageTitle : 'Ordered Page',
                path: '/order',
               
               })
      })
     }
exports.getChickUpShop = (req,res)=>{
    Product.fetchAll(product=>{

           // console.log(products);
           res.render('shop/checkout',{
               prods : product ,
                 pageTitle : 'Shop chickout',
                path: '/chickout',
               
               })
      })
     }