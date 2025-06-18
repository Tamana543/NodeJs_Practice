const http = require('http')

const express = require('express')

const app = express() // Create an Express application (it is a function call as the express module exports a function)

const server = http.createServer(app)// Create an HTTP server using the Express application

server.listen(5430,()=>{
     console.log("Hello from Express.js");
})