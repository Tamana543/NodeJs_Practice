const Cart = require('./cart')
const db =require('../util/database')

/*

function sqlDatba(){
     // unfunction this port // it is just for keeping code clean 

     If you prefer working with data inside file, not bringing it from main database : 
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
     })
     }
          static fetchAll(cb) {
               // fetchDataFromFile(cb)
      
               }
               static findById(id,cb){
                    fetchDataFromFile(products => {
                         const product = products.find(p => p.id === id)
                         cb(product)
                    })
               }
     }
      
}
**/
/*
If you are using sql database : 
module.exports = class Product{
     constructor(id,title,imageUrl,price,description){
          this.id = id
          this.title = title,
          this.imageUrl =  imageUrl,
          this.price = price,
          this.description = description
     }

     save(){
          return  db.execute('INSERT INTO products (title,description,price,imageURL) VALUES (?,?,?,?)',[
               this.title,this.description, this.price, this.imageUrl]
          )

    
     }

    static deleteById(id){

}
     static fetchAll() {
          // bringing database 
          return db.execute('SELECT * FROM products')  
     }
     static findById(id,cb){
     
          return db.execute('SELECT * FROM products WHERE products.id = ?',[id])     
          
     }
}
**/
const Sequalizer =require('sequelize') ;
 const sequalizer = require('../util/database');
const { promiseImpl } = require('ejs');

 const Product = sequalizer.define('product',{// the first element is the table name you want that the sequalizer create for you, the 2nd is the object for columns
     id:{
          type:Sequalizer.INTEGER,
          autoIncrement : true,
          allowNull : false,
          primaryKey : true,
     },
     title : Sequalizer.STRING,
     description :{
          type : Sequalizer.STRING,
          allowNull : false,
     },
      price: {
          type: Sequalizer.DOUBLE,
          allowNull :false
     },
     imageURL : {
          type : Sequalizer.STRING,
          allowNull: false
     }
 });

 module.exports = Product


