const express = require('express')
const app  = express()
const body = require('body-parser')
const users = [];
app.set('view engine','ejs')
app.set('views','views')
app.get('/',(req,res,nest)=>{
res.render('index',{pageTitle : 'Add User'})
})
app.get('/users',(req,res,next)=>{
     res.render('user',{pageTitle : "User"})
})
app.post('/add-user',(req,res,next)=>{
     users.push({userName : req.users.userName})
     res.redirect('/users')
})
app.listen(5430)