const express = require('express')
const app = express()
const path = require('path')
const bodyPars = require('body-parser')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(bodyPars.urlencoded({extended:false}))

const users = []
app.get('/',(req,res,next)=>{
    res.render('index',{pageTitle : 'Admins', user:users}) 
   
})
app.get('/users',(req,res,next)=>{
   res.render('admin',{pageTitle: 'Add admin'}) 
})
app.post('/add-user',(req,res,next)=>{
     users.push({name : req.body.user})
     // console.log(users);
 res.redirect('/') 
})
app.listen(3000)