// file to make a connection between sql and the nodejs file 
// if you are going to use SQL : 
// const sql = require('mysql2')


// const pool = sql.createPool({// pool is where you can have a run-on connection between server opsite of create connection that use to connect only one way and you need to reconnect them each time 
// host: 'localhost',
// user : 'root',
// database : 'node_sql',
// password: 'Tamanasql0782177966@'
// })

// module.exports = pool.promise()// to give you the promise using feature( using asynchrounous feature)


// with sequalizer 

const Sequelize = require('sequelize')

const sequelize = new Sequelize( 'node_sql','root','Tamanasql0782177966@',{
     dialect: 'mysql',
     host: 'localhost',
      
})
module.exports = sequelize;