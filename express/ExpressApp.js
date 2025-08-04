const path = require('path')
const express = require('express')
const bodyParser = require('body-parser') // Import body-parser to parse incoming request bodies
const app = express() // Create an Express application (it is a function call as the express module exports a function)
// const expressHbs = require('express-handlebars');
const errorController = require('./controllers/404')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const User = require('./modules/user')

// Wiew enjine hundlers 
app.set('view engine','ejs')// setting the default templating enginge to the handlebar file 

app.set('views',path.join(__dirname,'views'))// In this line we are looking for the files that express should run the pug file
/**
 
// app.engine('hbs', expressHbs({layoutsDir : 'views/layouts',defaultLayout : 'main-layout',extname : 'hbs'}))//it use with the templating language engines that are not inide express js itself and you need to tell it to run the file base the givin engine, the first para is the name(as your wish), the second one is the variable you had exported above (there is a bugg with it)
// app.set('view engine','pug')// setting the default templating enginge to the pug file 
*/

const mangoCreateDb = require('./util/database').mangoCreateDb



//Midlewares
app.use(bodyParser.urlencoded({extended: false})) // Use body-parser middleware to parse URL-encoded bodies (like form submissions) and make the data available in req.body

// express is working as a middleware here, it is not a server, it is a framework to build web applications ( middleware is a function that takes a request and response object and does something with them, like logging, parsing, etc.)

//keep in mind that the order of the middleware is important, the first one will run first and then the next one, so if you want to run a middleware after another one, you have to put it after the first one
app.use(express.static(path.join(__dirname,'public')))// use thi line so that you would e able to connect the public css to your file and the css will be availabel and the html file will have access to it 

// sequalizer userTable middleware

app.use((req,res,next) =>{
User.findById('688c973b2b5f08ec4274da32').then(user=>{
     req.user = new User(user.name,user.email,user.cart,user._id);
     
     // console.log(user);
     next()
}).catch(err=>console.log(err))

})
app.use('/admin',adminRoutes)

app.use(shopRoutes)

app.use(errorController.get404)
// const server = http.createServer(app)// Create an HTTP server using the Express application
// server.listen(5430) or
//Sequalizer
/** 
 const sequalizer = require('./util/database')
const Product = require('./modules/product')
const User = require('./modules/user')
const Cart = require('./modules/cart')
const cartItems = require('./modules/cartItem')
const Order = require('./modules/order') ;
const orderItems = require('./modules/orderItem') ;
const OrderItem = require('./modules/orderItem')
const { FORCE } = require('sequelize/lib/index-hints')
// lets work with sequalizer and let it to run  the server 
     // Association ( search in sequalizer Doc)
     // I will keep the user s the connector between all moculews and tables: as the user is the one with many products one card and even order so 
     Product.belongsTo(User,{constraints : true, onDelete: 'CASCADE'})// onDelete CASCADE means if I deleted the user delete its products too
     User.hasMany(Product)
     User.hasOne(Cart)
     Cart.belongsTo(User)
     User.hasOne(cartItems)
     Cart.belongsToMany(Product , {through : cartItems})
     Product.belongsToMany(Cart , {through : cartItems})
     Order.belongsTo(User)
     User.hasMany(Order)
     Order.belongsToMany(Product,{through : OrderItem})


     sequalizer.sync({FORCE : true}).then(result=>{
          // force is use in parameter  ({force : true}) here to make a database everytime we wont to overwrote (dependesy : delete at the end)
          return User.findByPk(1)
          // console.log(result);
     }).then(user=>{
          if(!user){
               return User.create({name : 'Tamana',email : 'tamana.farzami33@gmail.com'})
          }
          return user;
     }).then((user)=>{
          
          return user.createCart();
          // console.log(user);
     
     }).then(user=>{
     app.listen(5430)
     }).catch(err=>{
          console.log(err);
     })
*/

// MANGO DB
mangoCreateDb(()=>{
     app.listen(5430)
})