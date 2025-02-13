// const fs = require('fs')

// const fs = require('fs')
const root = require("./root.js")
// fs.writeFileSync('Test.html', "A File Made by React")
// To creat a server by node.js
const http = require('http') // in here you called the http path from node js and import it 
const serverNew = http.createServer(root) // remember it need to be stored in a variable so that you can listen  it then. // it takes a function with 2 parametes (reqest and response)

serverNew.listen(5430) // you need to add a path to the listener, and if you do not add it, it will get something automatically be itself
// now then open terminal and write the node first.js , then open the browser and write the localhost:..(above path)
