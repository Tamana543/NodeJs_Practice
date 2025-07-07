const path = require('path')
const fs = require('fs')



const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'cart.json'
        )
module.exports = class Cart {
static addProduct(id,productPrice) {
     //lets fetch the previeus cart first 

fs.readFile(p,(err,fileContent)=>{
     let cart = {product: [] , totalPrice : 0}
if(!err) {
 cart = JSON.parse(fileContent)
}
// Analyse the cart 
const existantProductIndex = cart.product.findIndex(prod => prod.id === id) 
const existantProduct = cart.product[existantProductIndex]
let updatedProduct;
if(existantProduct){
updatedProduct = [...existantProduct]
updatedProduct.qty = updatedProduct.qty + 1
cart.product= [...cart.product]
cart.product[existantProductIndex] = updatedProduct
}else {
     updatedProduct = {id : id , qty : 1}
     cart.product = [...cart.product,updatedProduct]
}
cart.totalPrice = cart.totalPrice + +productPrice
fs.writeFile(p, JSON.stringify(cart) ,err => {
     console.log(err);
})
})
}
}