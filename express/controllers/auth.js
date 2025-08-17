exports.getLogin = (req,res)=>{
res.render('auth/login',{
    pageTitle : "Login Page",
      path : '/login',
        isAuthCorrect : req.isLoggedIn
   
  })


}
exports.postLogin = (req,res)=>{
  req.isLoggedIn = true
res.redirect('/')
}

