const express = require('express')
const app  = express()
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
     users.push()
     res.redirect('/users')
})
// 8:00
app.listen(5430)