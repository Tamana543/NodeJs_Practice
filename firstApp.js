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
console.log(req);
// console.log("MEEEEEE");
console.log(req.url,req.method,req.headers);
// process.exit() // to show that the process sstop excution and exit 
res.setHeader('content-type','text/Html')// to create the header for the page and the first parameter is saging .. the 2nd para tell you what type it should be
res.write('<html>')// started wrtitin main html structure
res.write('<head><title> My first Page of nodejs</title></head>')
res.write('<body><h2>Hello From NodeJs darling</h2><ul> <li> <a href="https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat">Press</a></body> </li></ul>')
res.write('</html>')
res.end()// to teel the respond it is ed of the project 
})
server.listen(5430)
