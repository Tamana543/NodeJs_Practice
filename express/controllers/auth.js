const bcreypt = require("bcrypt")
const user = require("../modules/user")

exports.getLogin = (req,res)=>{
 
  // const isLoggedIn =req.get('Cookie').trim().split('=')[1]==='true' ;

res.render('auth/login',{
    pageTitle : "Login Page",
      path : '/login',
      // isAuthCorrect: req.session.loggedIn || false
        // isAuthCorrect : logedIn
        isAuthCorrect : false,
        
   
  })


}

exports.getSignup = (req, res, next) => {
  // console.log("Me",req.session.isloggedin);
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthCorrect: false,
     
  });
};
exports.postLogin = (req,res)=>{
  // here you need to store users data so you can understand whose fie are these : cookie

const email = req.body.email
const password = req.body.password
//Lugging in in the user
user.findOne({email : email}).then((user)=>{
  if(!user){
    return res.redirect("/login")
  }
  
  bcreypt.compare(password, user.password).then(isMatching=>{
    if(isMatching){
  
    req.session.isloggedin =true
    req.session.user = user
   return  req.session.save((err)=>{
      console.log(err);
      res.redirect('/')
    })
    }
    res.redirect('/login')
  }).catch(err=>console.log(err))
}).catch(err=>console.log(err))

}
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmedPassword = req.body.confirmedPassword;

  user.findOne({email : email}).then(userDoc =>{

    if(userDoc){
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
    res.redirect('/')
  })
    
  }).catch(err=>console.log(err))
};
exports.postLogout = (req,res)=>{
req.session.destroy((err)=>{
 
  // to delete a session 
  res.redirect('/')

});
}

