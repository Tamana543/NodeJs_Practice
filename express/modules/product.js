
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
     constructor(t){
          this.title = t
     }

     save(){
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

