const http = require('http')
const bodyParser = require('body-parser') // Import body-parser to parse incoming request bodies
const express = require('express')

const app = express() // Create an Express application (it is a function call as the express module exports a function)
// express is working as a middleware here, it is not a server, it is a framework to build web applications ( middleware is a function that takes a request and response object and does something with them, like logging, parsing, etc.)

//keep in mind that the order of the middleware is important, the first one will run first and then the next one, so if you want to run a middleware after another one, you have to put it after the first one
app.use(bodyParser.urlencoded({extended: false})) // Use body-parser middleware to parse URL-encoded bodies (like form submissions) and make the data available in req.body
app.use('/add-product',(req,res)=>{
     res.send('<form action="/product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
})


app.use('/product',(req,res)=>{
     console.log(req.body);
     res.redirect('/message') // Redirect the user to the /message route after processing the form submission
})


app.use('/message',(req,res,next)=>{
     res.send("<h1>Hello From message</h1>") // Send a response to the client it is the end of the middleware chain, it sends the response and ends the request . It does the all res setHeader,write, and res.end in one go.
})

app.use('/',(req,res)=>{
     res.send('<h1>Hello From Express</h1>') // Send a response to the client
})
// const server = http.createServer(app)// Create an HTTP server using the Express application
// server.listen(5430) or
app.listen(5430) 
