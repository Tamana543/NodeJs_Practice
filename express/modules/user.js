const Sequalizer = require('sequelize')
const sequalizer = require('../util/database')

const User = sequalizer.define('userProduct',{
id : {
 type:Sequalizer.INTEGER,
          autoIncrement : true,
          allowNull : false,
          primaryKey : true,
},
name: Sequalizer.STRING,
email  :{
          type : Sequalizer.STRING,
          allowNull : false,
     }
})
module.exports = User;