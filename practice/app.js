const express = require('express')
const app = express()

app.get((req,res,next)=>{
})
app.get((req,res,next)=>{
     res.render('/users')
     res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="Enter product title" /><button type="submit">Add Product</button></form>')
})
app.post('/',(req,res,next)=>{

})
app.listen(3000)