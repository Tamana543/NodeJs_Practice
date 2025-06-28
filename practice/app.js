const express = require('express')
const app = express()
const path = require('path')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res,next)=>{
    res.render('') 
})
app.get('/users',(req,res,next)=>{
  
})
app.post('/',(req,res,next)=>{

})
app.listen(3000)