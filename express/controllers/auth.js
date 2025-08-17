exports.getLogin = (req,res)=>{
res.render('auth/login',{
    pageTitle : "Login Page",
      path : '/login',
   
  })


}
exports.postLogin = (req,res)=>{
res.redirect('/')
}

