
// const time = require("./date.js")
// doing the app.js stafs with easily express

const http = require('http') 
const express = require("express")
// const serverNew = http.createServer(root) 
const app = express()
app.use((req, res, next)=> {
     console.log("Hello from Midleware First");
     next() // call this so it can go through the rest of code, if we dont have res.Otherwise the req will die 

}) 
app.use((req, res, next)=> {
     // console.log("Hello form Midleware 2 ");
     res.send('<h1> Tamana Farzami </h1>')
}) 
const serverNew = http.createServer(app)
// console.log(time);

serverNew.listen(5430) 
