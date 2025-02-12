// const fs = require('fs')
const { error } = require('console');
const fs = require('fs')
// fs.writeFileSync('Test.html', "A File Made by React")
// To creat a server by node.js
const http = require('http') // in here you called the http path from node js and import it 
const serverNew = http.createServer(function(req,res){
     // console.log(req);
     console.log(req.url, req.method  , req.headers);
     // it does make an event loop and it will continue working to keep the server active 
     // this will stop your server working 
     // Lets make s.thing that user can send data to our server
     const url = req.url;
     if(url === "/"){
          res.write("<html>")
          res.write("<body><form method='POST' action='/Tamana'><input type='text' name='message'/><button type='submit'>Send</button></form></body>")
          res.write('</html>')
        return res.end()
     }
   if(url === "/Tamana" && req.method == "POST"){
     const body = []; // lets add data as an external file
     req.on('data',(chunk)=> {
          console.log(chunk);
          body.push(chunk)

     }) 
     return req.on('end',()=>{
          const parsedBody = Buffer.concat(body).toString()
          // console.log(parsedBody);
          const messageServer = parsedBody.split("=")[1]

          fs.writeFile("message.txt",messageServer, error => {
               res.statusCode = 302;// the code for sending data to server
               res.setHeader("location",'/')
               return res.end()

          })
     })
   }

  
     res.setHeader("Created-Server","txt/html")
     res.write("<html></html>")
     res.write("<body></body>")
     res.write(" <h1>Tamana From Server</h1>")
     res.end()
     // process.exit()
     // res.write("<body><h1>Hello Tamana from server<h1/></body>")

}) // remember it need to be stored in a variable so that you can listen  it then. // it takes a function with 2 parametes (reqest and response)

serverNew.listen(5430) // you need to add a path to the listener, and if you do not add it, it will get something automatically be itself
// now then open terminal and write the node first.js , then open the browser and write the localhost:..(above path)
