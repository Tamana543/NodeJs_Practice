const { fileLoader } = require('ejs')
const fs = require('fs')
const path = require('path')
module.exports = class Product{
constructor(t){
     this.title = t
}
save(){
const mainPath = path.join(
   path.dirname(process.mainModule.filename) ,
   'data',
   'products'
)
fs.readFile( mainPath, (err, fileContent)=>{
   let products = []
   if(!err){
     products = JSON.parse(fileContent)
   }
   products.push(this)
   fs.writeFile( mainPath,JSON.stringify(products), err=>{
console.log(err);
   })
})
}
 static FetchAll(){
     fs.readFile(mainPath,(err,fileContent) =>{
if(err){
     return []
}
return JSON.parse(fileContent)
     })
}

}