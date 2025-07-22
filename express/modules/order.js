const Sequalizer = require('sequelize');

const sequalize = require('../util/database')

const Order = sequalize.define('order',{
     id : {
             type: Sequalizer.INTEGER,
               allowNull : false,
               autoIncrement : true,
               primaryKey : true
     }
})
module.exports = Order;