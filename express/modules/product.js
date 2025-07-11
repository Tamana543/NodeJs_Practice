
const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')
const Cart = require('./cart')

const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'
        )
const fetchDataFromFile = cb=>{
     fs.readFile(p,(err,fileContent)=>{

          if (err) {
              return cb([]);
          }
           return cb(JSON.parse(fileContent));
    
     })
}
module.exports = class Product{
     constructor(id,title,imageUrl,price,description){
          this.id = id
          this.title = title,
          this.imageUrl =  imageUrl,
          this.price = price,
          this.description = description
     }

     save(){
       
         fetchDataFromFile(products=>{
           if(this.id){
               // to add the edititing feature, first find the product by its id 
               const excistedProductIndex = products.findIndex(prod => prod.id === this.id) 
               const updatedProduct = [...products]
               updatedProduct[excistedProductIndex] = this;
               fs.writeFile(p, JSON.stringify(updatedProduct),err=>{
                    console.log(err);
               })
          }else {
               // console.log(products);
               this.id = Math.random().toString()
               products.push(this)
                 fs.writeFile(p, JSON.stringify(products),err=>{
                    console.log(err);
               })
          }
         })
         
     }

    static deleteById(id){
          fetchDataFromFile(prods=>{
               const cleanedId = id.toString().trim();
              
               const product = prods.find(prod => prod.id === cleanedId)
               
               // console.log( "See hereee " , product);
          const prodForDel = prods.filter(prod => prod.id !== cleanedId)
          // console.log(prods.id, "and",id);
          // console.log(prodForDel);
          fs.writeFile(p, JSON.stringify(prodForDel),err =>{
               if(!err){
                    Cart.deleteProd(id, product.price)
               }
               console.log("Error",err);
          })
})}
     static fetchAll(cb) {
          fetchDataFromFile(cb)
 
          }
          static findById(id,cb){
               fetchDataFromFile(products => {
                    const product = products.find(p => p.id === id)
                    cb(product)
               })
          }
}

