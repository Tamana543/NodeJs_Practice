const { fileLoader } = require('ejs')
const fs = require('fs')
const path = require('path')

module.exports = class Product{
     constructor(t){
          this.title = t
     }
     save(){
          const p = path.join(
          path.dirname(process.mainModule.filename) ,
          'data',
          'products.json'
          );
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
        const p = path.join(
          path.dirname(process.mainModule.filename),
          'data',
          'products.json'
        );console.log(p);
        fs.readFile(p, (err, fileContent) => {
          if (err) {
            cb([]);
          }
          cb(JSON.parse(fileContent));
        });
      }
     }

