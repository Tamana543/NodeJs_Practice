const express = require('express')
const app  = express()
const body = require('body-parser')
const path = require("path")
const users = [];

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended: false}))
app.get('/',(req,res,nest)=>{
res.render('index',{pageTitle : 'Add User',path : 'add-User'})
})
app.get('/users',(req,res,next)=>{
     res.render('user',{pageTitle : "User",users : users,path : 'users'})
})
app.post('/add-user',(req,res,next)=>{
     users.push({userName: req.body.userName})
     res.redirect('/users')
})
app.listen(5430)