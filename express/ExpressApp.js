const path = require('path')
const express = require('express')
const bodyParser = require('body-parser') // Import body-parser to parse incoming request bodies
const mongoose = require('mongoose')
const app = express() // Create an Express application (it is a function call as the express module exports a function)
const expressHbs = require('express-handlebars');
const errorController = require('./controllers/404')
const session = require('express-session')
const mongostoreSession = require('connect-mongodb-session')(session)

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
const User = require('./modules/user')

// Wiew enjine hundlers 
app.set('view engine','ejs')// setting the default templating enginge to the handlebar file 

app.set('views',path.join(__dirname,'views'))// In this line we are looking for the files that express should run the pug file
/**
 
// app.engine('hbs', expressHbs({layoutsDir : 'views/layouts',defaultLayout : 'main-layout',extname : 'hbs'}))//it use with the templating language engines that are not inide express js itself and you need to tell it to run the file base the givin engine, the first para is the name(as your wish), the second one is the variable you had exported above (there is a bugg with it)
// app.set('view engine','pug')// setting the default templating enginge to the pug file 
*/

const mangoCreateDb = require('./util/database').mangoCreateDb

const MONGODB_URI =  'mongodb+srv://tamanafarzami33:jn2K309ZE6C3Re3y@cluster0.ufecoqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'



//Midlewares
app.use(bodyParser.urlencoded({extended: false})) // Use body-parser middleware to parse URL-encoded bodies (like form submissions) and make the data available in req.body

// express is working as a middleware here, it is not a server, it is a framework to build web applications ( middleware is a function that takes a request and response object and does something with them, like logging, parsing, etc.)

//keep in mind that the order of the middleware is important, the first one will run first and then the next one, so if you want to run a middleware after another one, you have to put it after the first one
app.use(express.static(path.join(__dirname,'public')))// use thi line so that you would e able to connect the public css to your file and the css will be availabel and the html file will have access to it 


// session 
const store = new mongostoreSession({
     uri : MONGODB_URI,
     collection : 'sessions'
})
app.use(session({
     'secret':'Tamana Loves Cats and JS',
     resave : false,
     saveUninitialized : false,
     store : store
      
}))

// sequalizer userTable middleware

app.use((req,res,next) =>{
User.findById('68973df898beb0212720833f').then(user=>{
     req.user =user
     
     
     // console.log(user);
     next()
}).catch(err=>console.log(err))

})
app.use('/admin',adminRoutes)

app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)
// const server = http.createServer(app)// Create an HTTP server using the Express application
// server.listen(5430) or

// MANGO DB
// mangoCreateDb(()=>{
//      app.listen(5430)
// })
//mongodb+srv://tamanafarzami33:jn2K309ZE6C3Re3y@cluster0.ufecoqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//Gt6yKZ,%x_PG*Vs
// with mongoose 
mongoose
.connect(
    MONGODB_URI 
)
.then(result=>{
     User.findOne().then(user =>{
          if(!user){
               const user = new User({
name:'Tamana',
email : 'tamana.farzami33@gmail.com',
cart : []
})

return user.save()
}
})
     app.listen(5430)
})
.catch(err=>console.log(err))