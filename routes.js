const fs = require('fs')
// fs.writeFileSync("text.txt","Hell I am new")

const requestHundler = (req,res)=>{
     // const data = String(req)
     // file.writeFileSync("Text.txt",data)
// console.log(req);
// console.log("MEEEEEE");
// console.log(req.url,req.method,req.headers);
const url = req.url
const method =req.method;
if(url === "/") {
 res.setHeader('content-type','text/Html')
res.write('<html>')
res.write('<head><title> My first Page of nodejs</title></head>')
res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body> </li></ul>')
res.write('</html>')
return res.end()  // we return this from function to avoid excution of the next codes if the url is /   
}
if(url === "/message" && method === "POST") {
// Hundling data to be sent  inside the data file 
const body = [];
req.on("data",(chunk)=>{
     body.push(chunk) // search the chunk
     console.log(chunk);
     })
return req.on("end",()=>{ // watch the video 12 /season 13 ( asynchrounous node handling)
     const parsedData = Buffer.concat(body).toString()
     const data = parsedData.split("=")[1]
     // console.log(data);
     //fs.writeFileSync("data.txt",data) // to store the data getted from form into a file  : but keep it in your mind this process is synchrounous so ::
   fs.writeFile("data.txt",data,(err)=>{ // as the node js follow the synchrounous pattern it is  the best choice,

        // to redirect to the / again 
        //  res.redirect(301, '/new-route') or 
        res.statusCode = 301; // used for redirecd 
        res.setHeader('Location','/')
        return res.end()
   })
  })
}
// process.exit() // to show that the process sstop excution and exit 
res.setHeader('content-type','text/Html')// to create the header for the page and the first parameter is saging .. the 2nd para tell you what type it should be
res.write('<html>')// started wrtitin main html structure
res.write('<head><title> My first Page of nodejs</title></head>')
res.write(`<body><h2>Hello From NodeJs</h2><ul> <li> <a href="https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat">Press</a></body> </li></ul>`)
res.write('</html>')
res.end()// to teel the respond it is end of the project
}