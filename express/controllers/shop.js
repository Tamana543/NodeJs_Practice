const Product = require('../modules/product')
const Order = require('../modules/order')





exports.getProductsShop = (req,res)=>{
  // with sequalizer 

  // Product.fetchALL() // with simple sequalizer 
  // with mongoose : 
  Product.find()
  // .select('price title')// populate method wil give you exactly the whole user obj without it you have access only on name and some information (name) .
  // .populate('user','name') 
  .then(products=>{
    res.render('shop/product-list',{
      prods : products,
      pageTitle : 'Products',
        path: '/products',
       
    })  
  }).catch(err=>console.log(err))


}
exports.getShopPage = (req,res)=>{

// Product.fetchALL() with vanila mongodb
Product.find()// with mongoose 
.then(products=>{
res.render('shop/index',{
    prods : products ,
      pageTitle : 'All products',
     path: '/',
     

     })
}).catch(err=>console.log(err))

     }


exports.getProductBId = (req,res,next)=>{
      const productId = req.params.productId; // params object is given by express and Yiu can find the dinamic productId from it 
     // working with MangoBd
            
          Product.findById(productId).then(product=>{
            res.render('shop/product_detail',{
              product : product,
                pageTitle : product.title,
                path: '/products',
            })
          }).catch(err=>console.log(err))
}
exports.getCartShop =(req,res)=>{
// console.log(req.user.getCart());
// by Mongoose
console.log(req.user)
 req.user.populate('cart.items.productId').then(user =>{
//  console.log(cart);
const carts = user.cart.items;
 res.render('shop/cart', {
     path: '/cart',
     pageTitle : 'Cart', 
     prods : carts ,
      isAuthenticated: req.session.isLoggedIn,
      csrfToken : req.csrfToken()
     })

 }).catch(err=>{
   console.log(err);
 })


}
    
exports.postCartShop = (req,res,next)=>{
  // console.log('req Budy ', req.body);
  const productId = req.body.productId;

try {
  
  Product.findById(productId).then((product)=>{
 console.log("Me",req);
  return req.user.addToCart(product)
  }).then(
    (result)=>{
     
     res.redirect('/cart')
    }
  ).catch(err=>console.log(err))
  
  
} catch (error) {
console.log(error);
}

}

exports.postDelCardView = (req,res)=>{
    const productId = req.body.productId.trim();
    // console.log("Here",req.user);
    
//By mongoDb
req.user.deleteCartItem(productId).then(cart=>{
  // return cart.findById()
   res.redirect('/cart')
}).catch(err=>console.log(err))

}

exports.postOrderShop = (req,res,next)=>{
  
req.user.populate('cart.items.productId').then(user =>{
//  console.log(cart);
const product = user.cart.items.map(i =>{
  return {quantity : i.quantity, product : {...i.productId._doc}}
});
const order = new Order({
user : {
   email : req.user.email,
    userId : req.user
},
products : product
 
}); 

return order.save()
 })
 .then((result)=>{
return req.user.clearCart()
 
})
.then(()=> res.redirect('/order'))
.catch(err=>console.log(err))

// with Mongodb
/**

  // req.user.addOrder().then((result)=>{

  //   res.redirect('shop/order')
  // }).catch(err=>console.log(err))
 */

 
}


exports.getOrderShop = (req,res)=>{
// with mongoose 
Order.find({'user.userId': req.user._id})
.then(result=>{

  res.render('shop/order',{
    pageTitle : "Ordered Page",
      path : '/order',
    order: result,
         
  })
}).catch(err=>console.log(err))
// with Mongodb
/**
 
  // req.user.getOrder().then(result=>{
  //   res.render('shop/order',{
  //     pageTitle : 'Ordered Page',
  //     path : '/order',
  //     order : result
  //   })
  // })
 */

}

