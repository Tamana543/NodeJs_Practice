const bcreypt = require("bcrypt")
const user = require("../modules/user")
const nodemailer = require("nodemailer");
const nodemailerTransp = require("nodemailer-sendgrid-transport")


// const transport = nodemailer.createTransport(nodemailerTransp({
//   auth:{
//     api_key : '90c487b367fd75893b92a826cf4d55dd-3c134029-4f83497b',
//   }
// }))

  

exports.getLogin = (req,res)=>{
 
  // const isLoggedIn =req.get('Cookie').trim().split('=')[1]==='true' ;
let errorMessage = req.flash('userError')

if(errorMessage.length > 0){
  errorMessage = errorMessage
}else {
  errorMessage = null
}
res.render('auth/login',{

    pageTitle : "Login Page",
      path : '/login',
      // isAuthCorrect: req.session.loggedIn || false
        // isAuthCorrect : logedIn
        isAuthCorrect : false,
        errorMessage : errorMessage
        
   
  })


}

exports.getSignup = (req, res, next) => {
  let errorMessage = req.flash('userError')

if(errorMessage.length > 0){
  errorMessage = errorMessage
}else {
  errorMessage = null
}
  // console.log("Me",req.session.isloggedin);
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthCorrect: false,
    errorMessage : errorMessage
     
  });
};
exports.postLogin = (req,res)=>{
  // here you need to store users data so you can understand whose fie are these : cookie

const email = req.body.email
const password = req.body.password
//Lugging in in the user
user.findOne({email : email}).then((user)=>{
  if(!user){
         req.flash('userError','User with this email address is not found :(')
    return res.redirect("/login")
  }
  
  bcreypt.compare(password, user.password).then(isMatching=>{
    if(isMatching){
  
    req.session.isloggedin =true
    req.session.user = user
   return  req.session.save((err)=>{
      // console.log(err);
 
      res.redirect('/')
    })
    }else {
      req.flash('userError','Incorrect Password :/')
      res.redirect('/login')
    }
  }).catch(err=>console.log(err))
}).catch(err=>console.log(err))

}
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmedPassword = req.body.confirmedPassword;

  user.findOne({email : email}).then(userDoc =>{

    if(userDoc){
      req.flash('userError','User already exist, try login ᓚᘏᗢ')
      return res.redirect('/signup')
    }
    return bcreypt.hash(password,12).then((hashedPassword) =>{
      req.session.isloggedin = true
 const newUser = new user({
     email : email,
      password : hashedPassword,
      card : {item : []}
    })
    return newUser.save()
  }).then(result=>{
     fetch('https://api.mailgun.net/v5/sandbox/auth_recipients?email=your-email@example.com', {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from('90c487b367fd75893b92a826cf4d55dd-3c134029-4f83497b').toString('base64')
  }
})
.then(res =>  res.redirect('/'))
.catch(err => console.log('Error:', err.message));
  })
    
  }).catch(err=>console.log(err))
};
exports.postLogout = (req,res)=>{
req.session.destroy((err)=>{
 
  // to delete a session 
  res.redirect('/')

});
}

