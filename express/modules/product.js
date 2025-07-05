
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
     constructor(title,imageUrl,price,description){
          this.title = title,
          this.imageUrl =  imageUrl,
          this.price = price,
          this.description = description
     }

     save(){
          this.id = Math.random().toString()
         fetchDataFromFile(products=>{
          products.push(this)
          fs.writeFile(p, JSON.stringify(products),err=>{
               console.log(err);
          })
         })
         
     }
     static fetchAll(cb) {
          fetchDataFromFile(cb)
 
      }
}

