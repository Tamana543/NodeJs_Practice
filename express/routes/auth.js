const authController =  require('../controllers/auth')
const express = require('express')
const {check} = require('express-validator')
const router = express.Router()



router.get('/login',authController.getLogin)

router.post('/login',authController.postLogin)

router.post('/logout',authController.postLogout)

router.post('/signup',check('email')
.isEmail()
.withMessage("Please enter an valid email. ")
.custom((email,{req})=>{
if(email == 'tamanafarzami22@gmail.com'){
     throw new Error("This user is blocked..")

}
return true
}), authController.postSignup);


router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;