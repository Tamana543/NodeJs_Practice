// const time = require("./date.js")
// doing the app.js stafs (creating Server) with easily express
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// I need to parse the body of product to get a JSON file with key & Value
app.use(bodyParser.urlencoded({extended : false}))
// const serverNew = http.createServer(root) 
app.use("/app-product" , (req, res, next)=> {
     res.send("<form action='/product' method='POST' ><input type = 'text' name ='title' /> <button type ='submit'>Add To Shop </button></form>")
     // next() // call this so it can go through the rest of code, if we dont have res.Otherwise the req will die 

}) 
app.post("/product", (req ,res ,next)=> { // we use post instead of use to filter the request for only post  
     console.log(req.body);
     res.redirect('/')
})
app.use("/",(req, res, next)=> { // it takes one call back and a filter, Like above app if the url gith the path with / the page shows this server. And the other hund if it has a /app.. it will run above server
     // console .log("Hello form Midleware 2 ");
     res.send('<h1> Tamana Farzami </h1>')
}) 
app.listen(5430) 
// console.log(time);
