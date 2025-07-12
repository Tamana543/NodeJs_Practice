const path = require('path')
const express = require('express')
const bodyParser = require('body-parser') // Import body-parser to parse incoming request bodies
const app = express() // Create an Express application (it is a function call as the express module exports a function)
// const expressHbs = require('express-handlebars');
const errorController = require('./controllers/404')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const db = require('./util/database')

// Wiew enjine hundlers 
// app.engine('hbs', expressHbs({layoutsDir : 'views/layouts',defaultLayout : 'main-layout',extname : 'hbs'}))//it use with the templating language engines that are not inide express js itself and you need to tell it to run the file base the givin engine, the first para is the name(as your wish), the second one is the variable you had exported above (there is a bugg with it)
app.set('view engine','ejs')// setting the default templating enginge to the handlebar file 
// app.set('view engine','pug')// setting the default templating enginge to the pug file 
app.set('views',path.join(__dirname,'views'))// In this line we are looking for the files that express should run the pug file

// making the database connection 

db.execute('SELECT * FROM products').then().catch()

//Midlewares
app.use(bodyParser.urlencoded({extended: false})) // Use body-parser middleware to parse URL-encoded bodies (like form submissions) and make the data available in req.body

// express is working as a middleware here, it is not a server, it is a framework to build web applications ( middleware is a function that takes a request and response object and does something with them, like logging, parsing, etc.)

//keep in mind that the order of the middleware is important, the first one will run first and then the next one, so if you want to run a middleware after another one, you have to put it after the first one
app.use(express.static(path.join(__dirname,'public')))// use thi line so that you would e able to connect the public css to your file and the css will be availabel and the html file will have access to it 
app.use('/admin',adminRoutes)

app.use(shopRoutes)

app.use(errorController.get404)
// const server = http.createServer(app)// Create an HTTP server using the Express application
// server.listen(5430) or
app.listen(5430) 
