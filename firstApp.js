// console.log("Hello from node js");
// const fs = require('fs')
// fs.writeFileSync("text.txt","Hell I am new")
const file = require('fs');
const data = "I am from data";
file.writeFileSync("Text.txt",data)