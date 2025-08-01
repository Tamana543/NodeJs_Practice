// const Cart = require('./cart')
const db =require('../util/database')
const mongoDb = require('mongodb')

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

// for sequalizer 
/**
 *
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
 */

// with mangoDb
const getDb = require('../util/database').getDb;
class Product {
     constructor(title,imageUrl,price,description,id,userId){
          this.title = title,
          this.imageUrl =  imageUrl,
          this.price = price,
          this.description = description,
          this._id = id ? new mongoDb.ObjectId(id) : null,
          this.userId = userId

     }
     save(){
          const db =getDb() ;
          let dbObs;
          if(this._id){
               dbObs = db.collection('products').updateOne({_id : this._id},{$set:this})
          }else {
               dbObs = db.collection('products').insertOne(this)
               
          }
          return dbObs.then(result =>{
               // console.log(result);
          }).catch(err => console.log(err))
     }
     static fetchALL(){
          const db =getDb()
          return db.collection('products').find().toArray().then(result=>{
               // console.log(result);
               return result
          }).catch(err=>console.log(err))
     }
     static findById(prodID){
          const db = getDb()
          const productId = new mongoDb.ObjectId(prodID)
          return db.collection('products').find({_id : productId}).next().then(product=>{// in here the mangodb have stored the id in an other formate, to get the id or others you need to use mangodb's functionaions{_id : prodID} => ..
               // console.log(product);
               return product
          }).catch(err=>console.log(err))
     }
     static deleteProd(prodId){
          const prodForDel =new mongoDb.ObjectId(prodId) ;
//              if (!prodForDel.isValid(prodId)) {
//       console.log(' Invalid ObjectId:', prodId);
//       return Promise.resolve()
//     }
     const db = getDb()
try {
     return db
     .collection('products')
     .deleteOne({_id: prodForDel })
     .then(result=>{
          console.log("Deleted");
     }).catch(err=>console.log(err))
     
} catch (error) {
     console.log("Hereeee",error);
}
     }
}
 module.exports = Product


