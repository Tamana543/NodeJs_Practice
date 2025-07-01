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
)
fs.readFile(p , (err, fileContent)=>{
   let products = []
   if(!err){
     products = JSON.parse(fileContent)
   }
   products.push(this)
   
})
}
 static FetchAll(cd){
     fs.readFile(p , (err,fileContent) =>{
if(err){
    cd([])
}
cd(JSON.parse(fileContent))
     })
}

}