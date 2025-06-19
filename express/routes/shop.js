const express= require('express');

const router = express.Router()

router.get('/',(req,res)=>{
     res.send('<h1>Welcome to my online shop</h1>') // Send a response to the client
})

module.exports = router;