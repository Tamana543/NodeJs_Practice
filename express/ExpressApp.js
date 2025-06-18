const http = require('http')

const express = require('express')

const app = express() // Create an Express application (it is a function call as the express module exports a function)
// express is working as a middleware here, it is not a server, it is a framework to build web applications ( middleware is a function that takes a request and response object and does something with them, like logging, parsing, etc.)
app.use('/',(req,res,next)=>{
     //req and res are the same in other exores files but next is a function that tells express to continue to the next middleware in the stack
     console.log("I am the midleware that run always first")
     
    next()
}
//keep in mind that the order of the middleware is important, the first one will run first and then the next one, so if you want to run a middleware after another one, you have to put it after the first one
)

app.use('/message',(req,res,next)=>{
     console.log("I am the second middleware");
const data = '<div><h1>Hello From message</h1> <p> You can do it :) </p> <form><input type="text" placeholder="Enter your name" /><label>Name</label></form></div>';
res.send(data) // Send a response to the client it is the end of the middleware chain, it sends the response and ends the request . It does the all res setHeader,write, and res.end in one go.
})
// const server = http.createServer(app)// Create an HTTP server using the Express application
// server.listen(5430) or
app.listen(5430) 
