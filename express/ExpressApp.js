const express = require('express')
const bodyParser = require('body-parser') // Import body-parser to parse incoming request bodies
const app = express() // Create an Express application (it is a function call as the express module exports a function)
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path')


app.use(bodyParser.urlencoded({extended: false})) // Use body-parser middleware to parse URL-encoded bodies (like form submissions) and make the data available in req.body

// express is working as a middleware here, it is not a server, it is a framework to build web applications ( middleware is a function that takes a request and response object and does something with them, like logging, parsing, etc.)

//keep in mind that the order of the middleware is important, the first one will run first and then the next one, so if you want to run a middleware after another one, you have to put it after the first one

app.use('/admin',adminRoutes)

app.use(shopRoutes)

app.use((req,res)=>{
     res.status(404).sendFile(path.join(__dirname,'Views','404.html'))
})
// const server = http.createServer(app)// Create an HTTP server using the Express application
// server.listen(5430) or
app.listen(5430) 
