const user = require("../modules/user")

exports.getLogin = (req,res)=>{
 
  // const isLoggedIn =req.get('Cookie').trim().split('=')[1]==='true' ;

res.render('auth/login',{
    pageTitle : "Login Page",
      path : '/login',
        // isAuthCorrect : isLoggedIn
        isAuthCorrect : false
   
  })


}
exports.postLogin = (req,res)=>{
  // here you need to store users data so you can understand whose fie are these : cookie
  console.log( req.session.user );
  user.findById('68973df898beb0212720833f').then((user)=>{

    req.session.logedIn =true
    
    // res.session.user = user
    res.redirect('/')
  }).catch(err=>console.log(err))
}
exports.postLogout = (req,res)=>{
req.session.destroy((err)=>{
  console.log(err);
  // to delete a session 
  res.redirect('/')

})
}

