const { fileLoader } = require('ejs')
const fs = require('fs')
const path = require('path')

 const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'
        )
        const fetchDataFromFile = (cb,err)=>{
           if (err) {
               return cb([]);
          }
          try {
               
               cb(JSON.parse(fileContent));
               cb(products)
          } catch (error) {
               console.log("error from fetch:",error);
               cb([])
          }
        }
module.exports = class Product{
     constructor(t){
          this.title = t
     }

     save(){
         
          fs.readFile( p, (err, fileContent)=>{
          let products = []
          if(!err){
               try {
                    
                    products = JSON.parse(fileContent)
               } catch (error) {
                    console.log('Error ', error);
               }
          }
          products.push(this)
          fs.writeFile(p, JSON.stringify(products), err => {
                    console.log('Error writing files ',err);
               });
          });
     }
     static fetchAll(cb) {
       fs.readFile(p, (err, fileContent) => {
         fetchDataFromFile(cb)
        });
      }
     }

