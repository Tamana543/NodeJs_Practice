const path = require('path')
const fs = require('fs')
const { json } = require('body-parser')
const Product = require('./product')

const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'cart.json'
        )
module.exports = class Cart {
static addProduct(id,productPrice) {
     //lets fetch the previeus cart first 

fs.readFile(p,(err,fileContent)=>{
     let cart = {Product: [] , totalPrice : 0}
if(!err) {
 cart = JSON.parse(fileContent)
}
// Analyse the cart 
const existantCartIndex = cart.Product.findIndex(prod => prod.id === id) 
const existantCart = cart.Product.find(existantCartIndex) 
let updatedProduct;
if(existantCart){
updatedProduct = [...existantCart]
updatedProduct.qty = updatedProduct.qty+1
cart.Product= [...cart.Product]
cart.Product[existantCartIndex] = updatedProduct
}else {
     updatedProduct = {id : id , qty : 1}
     cart.Product = [...cart.Product,updatedProduct]
}
cart.totalPrice = cart.totalPrice + +productPrice
fs.writeFile(p, JSON.stringify(cart) ,err => {
     console.log(err);
})
})
}
}