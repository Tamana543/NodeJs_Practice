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
req.session.logedIn =true
res.redirect('/')
}

