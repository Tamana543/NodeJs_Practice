// with mangoose 
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const schemaFirstProduct =new Scheme({
     title : {
          type : String,
          require:true
     },
     price :{
          type : Number,
          require :true
     },
     description :{
          type : String,
          require : true
     },
     imageUrl : {
          type : String,
          require : true
     },


}) ;

module.exports = mongoose.model('Product',schemaFirstProduct)
// with mangoDb
/**
 
// const Cart = require('./cart')
const db =require('../util/database')
const mongoDb = require('mongodb')


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
 **/     


