const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)

const express= require('express');
const rootDir = require('../util/paths') 
const adminData = require('./admin')
const router = express.Router()

router.get('/',(req,res)=>{
     const products = adminData.product;
     res.render('shop',{prods : products , pageTitle : 'Shop',path:'/',prodsExist : products.length > 0, activeShop: true,productCss : true})// to render the default templates of shop.pug based the default tecmplate, and sinding the dynamic data (I had store and make it map through the js object ) to the pug file 
     // res.sendFile(path.join(rootDir,'Views','shop.html'))// it will send this file as a respond so that it will bw shown in page. a : __dirname mean chick the folder that I write this code on its file  b : '../' as the dir point on main folder and we need to go up , c: Views the secpnd port in URL , d: the last port of the url and the file
     })

module.exports = router;