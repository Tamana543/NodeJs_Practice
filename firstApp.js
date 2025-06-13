// console.log("Hello from node js");
// const fs = require('fs')
// fs.writeFileSync("text.txt","Hell I am new")
const file = require('fs');
// const data = "I am from data";
// file.writeFileSync("Text.txt",data)

//Server 
const http = require('http')
const server = http.createServer((req,res)=>{
     // const data = String(req)
     // file.writeFileSync("Text.txt",data)
// console.log(res);
// console.log("MEEEEEE");
console.log(req);
})
server.listen(5430)
