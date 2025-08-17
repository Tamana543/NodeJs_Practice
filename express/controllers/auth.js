exports.getLogin = (req,res)=>{
  const isLoggedIn =req.get('Cookie').trim().split('=')[1] ;

res.render('auth/login',{
    pageTitle : "Login Page",
      path : '/login',
        isAuthCorrect : isLoggedIn
   
  })


}
exports.postLogin = (req,res)=>{
  // here you need to store users data so you can understand whose fie are these : cookie
 res.setHeader('Set-Cookie',"isLoggedIn=true")
res.redirect('/')
}

