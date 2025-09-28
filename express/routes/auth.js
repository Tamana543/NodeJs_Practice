const authController =  require('../controllers/auth')
const express = require('express')
const {check,body} = require('express-validator')
const router = express.Router()



router.get('/login',authController.getLogin)

router.post('/login',authController.postLogin)

router.post('/logout',authController.postLogout)

router.post('/signup',[
check('email')
.isEmail()
.withMessage("Please enter an valid email. ")
.custom((email,{req})=>{
if(email == 'tamanafarzami22@gmail.com'){
     throw new Error("This user is blocked..")

}
return true
}),
body('password').isStrongPassword({
     minLength: 6,
     minLowercase:1,
     minUppercase:1,
     minSymbols: 1,
     minNumbers: 1
}).withMessage('Password must be at least 5 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.')
], authController.postSignup);


router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;