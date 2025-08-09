// with moongoose 

const mongoose = require('mongoose')
const schema = mongoose.Schema;

const UserSchema = new schema({
name : {
     type : String,
     require : true
},
email : {
     type:String,
     require:true
},
cart :{
items : [{productId : {type : schema.Types.ObjectId, require : true,ref:'Product'} ,quantity :{type : Number , require : true}}]
}
})
UserSchema.methods.addToCart = function(){

          const cartProductIndex = this.cart.items.findIndex(cp =>{
               return cp.productID.toString() === product._id.toString()
          })
          
          let newQuantity = 1; 
          const updatedCartItem = [...this.cart.items]

          if(cartProductIndex >= 0 ){
          newQuantity = this.cart.items[cartProductIndex].quantity + 1 ;
          updatedCartItem[cartProductIndex].quantity = newQuantity

          }else {
          updatedCartItem.push({productID : new objectId(product._id),quantity : newQuantity})
          }
                    
               const updatedCart = {items : updatedCartItem}   
               const db = getDb()
          return db.collection('users').updateOne({_id : new objectId(this._id)},{$set : {
               cart:updatedCart
          }})
     }

module.exports = mongoose.model('User',UserSchema)
//with mongoDB
/**
 
const mongoDB = require("mongodb");
const { get } = require("../routes/shop");
const getDb = require('../util/database').getDb;
const objectId = mongoDB.ObjectId;
class User {
     constructor(username, email,cart,id){
this.name= username,
this.email=email,
this.cart = cart,
this._id = id
     }
     save(){
          const db = getDb()
          return db.collection('users').insertOne(this)
     }

     addToCart(product){
          const cartProductIndex = this.cart.items.findIndex(cp =>{
               return cp.productID.toString() === product._id.toString()
          })
          
          let newQuantity = 1; 
          const updatedCartItem = [...this.cart.items]

          if(cartProductIndex >= 0 ){
          newQuantity = this.cart.items[cartProductIndex].quantity + 1 ;
          updatedCartItem[cartProductIndex].quantity = newQuantity

          }else {
          updatedCartItem.push({productID : new objectId(product._id),quantity : newQuantity})
          }
                    
               const updatedCart = {items : updatedCartItem}   
               const db = getDb()
          return db.collection('users').updateOne({_id : new objectId(this._id)},{$set : {
               cart:updatedCart
          }})
     }
     getCart(){
         const db = getDb()
         const productIds = this.cart.items.map(item=>{
          return item.productID
         });
         return db.collection('products')
         .find({_id:{$in:productIds}})
         .toArray()
         .then(products=>{
          return products.map(prod=>{
               return {...prod,quantity : this.cart.items.find(item=>{
                    return item.productID.toString() === prod._id.toString()
               }).quantity}
          })
         })
         .catch(err=>console.log(err))
     }

     static findById(id){
               const db = getDb()
               
               return db.collection('users').findOne({_id:new objectId(id)} ).then(user=>{
                    console.log(user)
                    return user 
               }).catch(err=>console.log(err))
     }
     addOrder(){
          const db = getDb();
         return this.getCart().then(products=>{

               const updatedOrder = {
               items : products,
               user:{
                    _id: new objectId(this._id),
                    name : this.name
               }
               }
               
          return db.collection('orders').insertOne(updatedOrder)
          }).then(result=>{
               this.cart = {items : []}// it clean the card not data base 
               return db.collection('users').updateOne({_id : new objectId(this._id) },{$set : {cart : {items : []}}})//it clear entire database 
          }).catch()
     }
     getOrder(){
          const db = getDb();
          // const order =  db.collection('orders').find({'user._id' : new objectId(this._id)});
          // console.log(order.toArray());
          return db.collection('orders').find({'user._id' : new objectId(this._id)}).toArray()
     }
     deleteCartItem(prod_id){
          const updatedItem = this.cart.items.filter(id =>{
               return id.productID.toString() !== prod_id.toString()
          })
          console.log(updatedItem);
          const db = getDb();
          return db.collection('users').updateOne({_id : new objectId(this._id)},{$set : {cart : {items : updatedItem}}})

     }
}

module.exports = User;
 */