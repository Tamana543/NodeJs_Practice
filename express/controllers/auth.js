const user = require("../modules/user")

exports.getLogin = (req,res)=>{
 
  // const isLoggedIn =req.get('Cookie').trim().split('=')[1]==='true' ;

res.render('auth/login',{
    pageTitle : "Login Page",
      path : '/login',
      // isAuthCorrect: req.session.loggedIn || false
        // isAuthCorrect : logedIn
        isAuthCorrect : req.session.isloggedin
   
  })


}

exports.getSignup = (req, res, next) => {
  console.log("Me",req.session.isloggedin);
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthCorrect: req.session.isloggedin
  });
};
exports.postLogin = (req,res)=>{
  // here you need to store users data so you can understand whose fie are these : cookie
console.log(req.session)
  user.findById('68973df898beb0212720833f')
  .then((user)=>{
    
    req.session.isloggedin =true
    console.log("Here", req.session);
    
    req.session.user = user
    req.session.save((err)=>{
      console.log(err);

      res.redirect('/')
    })
  }).catch(err=>console.log(err))
}
exports.postSignup = (req, res, next) => {};
exports.postLogout = (req,res)=>{
req.session.destroy((err)=>{
  console.log(err);
  // to delete a session 
  res.redirect('/')

});
}

