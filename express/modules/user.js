// mongoDB

const { name } = require("ejs");
const mongoDB = require("mongodb")
const getDb = require('../util/database').getDb;

class User {
     constructor(username, email){
this.username= name,
this.email=email
     }
     save(){
const db = getDb()
return db.collection('users').insertOne(this)
     }
static findById(id){
const db = getDb()
const objectId = mongoDB.ObjectId;
return db.collection('users').findOne({_id:new objectId(id)} )
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