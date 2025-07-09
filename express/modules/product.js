
const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')

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
          cb(JSON.parse(fileContent));
    
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

               this.id = Math.random().toString()
               products.push(this)
                 fs.writeFile(p, JSON.stringify(Product),err=>{
                    console.log(err);
               })
          }
         })
         
     }

    static delete(){
fetchDataFromFile(prods=>{
if(this.id){
const prodForDel = prods.filter(prod => prod.id !== this.id)
fs.writeFile(p, JSON.stringify(prodForDel),err =>{
     // if(!err){

     // }
     console.log("Error",err);
})
}

})
     }
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

