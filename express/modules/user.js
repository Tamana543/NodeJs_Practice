// mongoDB

const { name } = require("ejs");
const mongoDB = require("mongodb")
const getDb = require('../util/database').getDb;
//with Sequalizeer
class User {
     constructor(username, email){
this.username= name,
this.email=email
     }

}
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