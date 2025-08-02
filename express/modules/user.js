// mongoDB
const mongoDB = require("mongodb")
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
          // const cartProduct = this.cart.item.findIndex(cp =>{
          //      return cp._id === product._id
          // })
     const updatedCart = {items : [{productID : product._id,quantity : 1}]}   
const db = getDb()
db.collection('users').updateOne({_id : new objectId(this._id)},{$set : {
     cart:updatedCart
}})
     }
static findById(id){
          const db = getDb()
          
          return db.collection('users').findOne({_id:new objectId(id)} ).then(user=>{
               console.log(user)
               return user 
          }).catch(err=>console.log(err))
     }
}
//with Sequalizeer
/**
 // const Sequalizer = require('sequelize')
// const sequalizer = require('../util/database')

// const User = sequalizer.define('userProduct',{
// id : {
//  type:Sequalizer.INTEGER,
//           autoIncrement : true,
//           allowNull : false,
//           primaryKey : true,
// },
// name: Sequalizer.STRING,
// email  :{
//           type : Sequalizer.STRING,
//           allowNull : false,
//      }
// })
**/
module.exports = User;