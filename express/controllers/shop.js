const rootDir = require('../util/paths') 
const Product = require('../modules/product')
const Cart = require('../modules/cart')



exports.getProductsShop = (req,res)=>{
  // with sequalizer 

  Product.fetchALL().then(products=>{
    res.render('shop/product-list',{
      prods : products,
      pageTitle : 'Products',
        path: '/products',
    })
  }).catch(err=>console.log(err))

  // with sql 
//   Product.fetchAll().then(([rows])=>{
  
//  // res.sendFile(path.join
//            // console.log(products);
//            res.render('shop/product-list',{
//                prods : rows ,
//                  pageTitle : 'Products',
//                 path: '/products',
               
//                })
//   }).catch(err =>{
//     console.log(err);
//   })
}
exports.getShopPage = (req,res)=>{
// by using sequalizer 
/**
 * 
 */
Product.fetchALL().then(products=>{
res.render('shop/index',{
    prods : products ,
      pageTitle : 'All products',
     path: '/',
     prodsExist : products.length > 0,
      activeShop: true,
     productCss : true
     })
}).catch(err=>console.log(err))

  // by using sql 
//       Product.fetchAll().then(([row])=>{
// //row is whatever your database returning, like product
// res.render('shop/index',{
//     prods : row ,
//       pageTitle : 'All products',
//      path: '/',
//      prodsExist : row.length > 0,
//       activeShop: true,
//      productCss : true
//  // res.sendFile(path.join(rootDir,'Views','shop.html'))// it will send this file as a respond so that it will bw shown in page. a : __dirname mean chick the folder that I write this code on its file  b : '../' as the dir point on main folder and we need to go up , c: Views the secpnd port in URL , d: the last port of the url and the file
// })
//       }).catch(err=> console.log(err))// to render the default templates of shop.pug based the default tecmplate, and sinding the dynamic data (I had store and make it map through the js object ) to the pug file 
     }


exports.getProductBId = (req,res,next)=>{
      const productId = req.params.productId; // params object is given by express and Yiu can find the dinamic productId from it 
      // for working with sequalizer :
    /**
     
            Product.findAll({where: {id: productId}}).then(products =>{
      res.render('shop/product_detail',{
              product : products[0],
                pageTitle : products.title,
                path: '/products'
            })
    }).catch(err=>console.log(err))
          while working with sql : 
          Product.findById(productId).then((product)=>{
            console.log(product);
            res.render('shop/product_detail',{
              product : product,
                 pageTitle : product.title,
                 path: '/products'
            })

          }).catch(err => console.log(err))
      
          console.log(productId);
     */


          // working with MangoBd
            
          Product.findById(productId).then(product=>{
            res.render('shop/product_detail',{
              product : product,
                pageTitle : product.title,
                path: '/products'
            })
          }).catch(err=>console.log(err))
}
exports.getCartShop = (req,res)=>{
// console.log(req.user.getCart());

// by using MongoDB
req.user.getCart().then(cart =>{
 console.log(cart);

 res.render('shop/cart', {
     path: '/cart',
     pageTitle : 'Cart', 
     prods : cart ,
     })

 }).catch(err=>{
   console.log(err);
 })

// sith Sequalizer
/**
 req.user.getCart().then(cart =>{
 // console.log(cart);
 return cart.getProducts().then(product =>{
 res.render('shop/cart', {
     path: '/cart',
     pageTitle : 'Cart', 
     prods : product ,
     })
 }).catch(err=>console.log(err))
 }).catch(err=>{
   console.log(err);
 })
 
 */

  //   Cart.getCart().then((products)=>{

  //     const cartProducts = []
  //     for (prod of products){
  //       const productExist = products.find(p => p.id === prod.id)
  //         if(productExist) {
  //          try {
  //            cartProducts.push({productData : prod , qty : productExist.qty})
  //          } catch (error) {
  //            console.log("Hereeeee",error);
  //         }
  //         }
  //     }
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle : 'Cart', 
  //   prods : cartProducts ,
  //   })
  // }).catch(err => console.log(err)) 
}
    
exports.postCartShop = (req,res,next)=>{
  // console.log('req Budy ', req.body);
  const productId = req.body.productId;

// with NoSQL
Product.findById(productId).then((product)=>{
return req.user.addToCart(product)
}).then(
  (result)=>{
    console.log(result)
   res.redirect('/cart')
  }
).catch(err=>console.log(err))

  // with sequlizer
  /**
   
  let fetchCart ; 
  let newQuantity = 1
  req.user.getCart().then(cart=>{
    fetchCart = cart
    // console.log(id,productId);
return cart.getProducts({where: {id : productId}})
  }).then(products=>{
    let product;
    if(products.length > 0){

      product = products[0]
    }

    if(product){
// increasing quantity here
      const oldQuantity= product.cartItem.quantity ;
      newQuantity = oldQuantity + 1
      return product;

    }
      return Product.findByPk(productId);
  }).then(product=>{
     return fetchCart.addProduct(product, {through : {quantity : newQuantity}})
  }).then(()=>{
    res.redirect('/cart')
  }).catch(err=>{
    console.log(err);
  })
   */

  //with SQL 
  // try {
    
  //     Product.findById(productId).then((product)=>{
  //        Cart.addProduct(productId, product.price)
  //     }).catch(err =>{console.log(err)})
  // } catch (error) {
  //     console.log(error);
  // }
  //   res.redirect('/cart');  
}

exports.postDelCardView = (req,res)=>{
    const productId = req.body.productId.trim();
    // console.log("Here",req.user);
//By mongoDb
req.user.deleteCartItem(productId).then(cart=>{
  // return cart.findById()
   res.redirect('/cart')
}).catch(err=>console.log(err))

    // By sequalier 
    /**
     req.user.getCart().then(cart=>{
       return cart.getProducts({where : {id : productId}})
     }).then(products=>{
       const product = products[0]
       // console.log(product);
       return product.cartItem.destroy()
     }).then(()=>{
       res.redirect('/cart')
     }).catch(err => console.log(err))
     
     */
    
     // By SQL
     /**
      // Product.findById(productId,product=>{
      //     Cart.deleteProd(productId,product.price)
      //     res.redirect('/cart')
      // })
      // console.log(productId);
      
      */
}

exports.postOrderShop = (req,res,next)=>{
// with Mongodb
req.user.addOrder().then((result)=>{

  res.redirect('shop/order')
}).catch(err=>console.log(err))
 let fetchedCart;
  // with sequalizer
  /**
  
 req.user.getCart().then(cart=>{
   fetchedCart = cart 
   return cart.getProducts()
 }
 ).then(product=>{
  return req.user.createOrder().then((order)=>{
 order.addProduct(
   product.map(product=>{
     product.order_item = {quantity : product.cartItem.quantity}
     return product
   })
 )
  }).catch(err=>console.log(err))
   // console.log(prodeuct);
 }).then(result=>{
   return fetchedCart.setProducts(null)
 }).then(()=>{
   res.redirect('/order')
 
 }).catch(err=>console.log(err))
   */


}


exports.getOrderShop = (req,res)=>{
// with Mongodb

req.user.getOrder().then(result=>{
  res.render('shop/order',{
    pageTitle : 'Ordered Page',
    path : '/order',
    order : result
  })
})
  // with sequalizer
  /**
   
  req.user.getOrders({include : ['products']}).then(order=>{
// console.log(order);
    res.render('shop/order',{
      pageTitle : 'Ordered Page',
              path: '/order',
              order : order
    })
  }).catch(err =>console.log(err))
  */
  
}

