const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
id:{
     type : INTEGER,
     require : true
}
})
module.exports = mongoose.model('Order',OrderSchema)
// const Sequalizer = require('sequelize');

// const sequalize = require('../util/database')

// const Order = sequalize.define('order',{
//      id : {
//              type: Sequalizer.INTEGER,
//                allowNull : false,
//                autoIncrement : true,
//                primaryKey : true
//      }
// })
// module.exports = Order;