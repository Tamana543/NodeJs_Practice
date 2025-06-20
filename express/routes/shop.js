const path = require('path') // Import the path module to work with file and directory paths (if not use this the node js will point to the all your pc ads driveC)
const express= require('express');

const router = express.Router()

router.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'../','Views','shop.html'))// it will send this file as a respond so that it will bw shown in page. a : __dirname mean chick the folder that I write this code on its file  b : '../' as the dir point on main folder and we need to go up , c: Views the secpnd port in URL , d: the last port of the url and the file
     })

module.exports = router;