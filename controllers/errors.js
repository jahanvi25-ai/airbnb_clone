exports.pageNotFound = (req,res,next)=>{
res.status(404).render('pageNotFound',{pageTitle:'Page Not Found',
    isLoggedIn :req.isLoggedIn,
    isAdmin:req.isAdmin})
}
