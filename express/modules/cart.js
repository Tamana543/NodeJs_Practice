const path = require('path')
const fs = require('fs')
const { json } = require('body-parser')
const Product = require('./product')

const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'
        )
module.exports = class Cart {
static addProduct(id,productPrice) {
     //lets fetch the previeus cart first 

fs.readFile(p,(err,fileContent)=>{
     let cart = {Product: [] , totalPrice : 0}
if(!err) {
 cart = JSON.parse(fileContent)
}// continue then 
})
}
}