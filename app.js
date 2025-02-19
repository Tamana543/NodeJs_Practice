const http = require('http');// in here you called the http path from node js and import it 
// const fs = require('fs')

// const fs = require('fs')
// const root = require("./root.js")
// fs.writeFileSync('Test.html', "A File Made by React")
const fs = require('fs');

const server = http.createServer((req, res) => { // To creat a server by node.js  // remember it need to be stored in a variable so that you can listen  it then. // it takes a function with 2 parametes (reqest and response)
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);// you need to add a path to the listener, and if you do not add it, it will get something automatically be itself
// now then oحen terminal and write the node first.js , then open the browser and write the localhost:..(above path)
