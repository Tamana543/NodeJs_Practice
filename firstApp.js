// keep in mind if you try to manipulate anything from imported roots, it will not effect the main file in the given rout.

const router = require("./routes")
//Server 
const http = require('http')
const server = http.createServer(router.handler)
server.listen(5430)
