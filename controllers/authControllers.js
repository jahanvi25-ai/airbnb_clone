const {check, validationResult} = require('express-validator')
const User = require('../models/user.js')
const bcrypt = require("bcryptjs")
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    isLoggedIn: false,
    isAdmin: false,
    errors: [],
    oldInput: {
      email: ""
    }
  });
};

exports.postLogin = async (req,res,next)=>{

    const {email,password} = req.body;
    const user = await User.findOne({email});
      if(!user){
        return res.status(422).render("auth/login",{
        pageTitle:'login',
        isLoggedIn:false,
        errors:['user does not exist'],
        oldInput:{email}
      })
      }
     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
       return res.status(422).render("auth/login",{
        pageTitle:'login',
        isLoggedIn:false,
        errors:['Invalid password'],
        oldInput:{email}
      })
     }

    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id.toString(),
      userType: user.userType
    };
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
    
}

exports.getSignup =(req,res,next)=>{
res.render('auth/signup',{pageTitle:"signup",
    isLoggedIn :false,
    isAdmin:false,
     errors:[],
    oldInput:{
      FirstName:"",
      LastName:"",
      email:"",
      userType:""
    }
  }
  )
}

exports.postSignup = [
  check('FirstName')
  .trim()
  .isLength({min:2})
  .withMessage("First name should be 2 characters long")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("First name should only contain alphabets"),

  check('LastName')
  .matches(/^[A-Za-z\s]*$/)
  .withMessage('Last name can only contain alphabets'),

  check('email')
  .isEmail()
  .withMessage('please enter a valid email')
  .normalizeEmail(),

  check('password')
  .isLength({min:8})
  .matches(/[A-Z]/)
  .withMessage('password must contain atleast one uuper case letter')
  .matches(/[a-z]/)
  .withMessage('password must contain atleast one lower case letter')
  .matches(/[0-9]/)
  .withMessage('password must contain atleast one number')
  .matches(/[!@#$%^&*(){}<>]/)
  .withMessage('password must contain atleast one special case character'),

  check('confirmed password')
  .trim()
  .custom((value,{req})=>{
      if(value !=req.body.password){
        throw new Error('password does not match')
      }
      return true
  }),

  check("userType")
  .notEmpty()
  .withMessage("choose one")
  .isIn(['guest','host'])
  .withMessage("invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage("please accept the terms and conditions")
  .custom((value,{req})=>{
    if(value !=="on"){
      throw new Error('please accept the terms and conditions')   
     }
     return true
  }),

  (req,res,next)=>{
    console.log("req.body",req.body)
    const {FirstName,LastName,email,password,userType} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(422).render("auth/signup",{
        pageTitle:'signup',
        isLoggedIn:false,
        errors: errors.array().map(error => error.msg),
        oldInput:{
          FirstName,
          LastName,
          email,
          password,
          userType
        }
      })
    }

    bcrypt.hash(password,12).then((hashedPassword)=>{
       const user = new User({FirstName,LastName,email,password:hashedPassword,userType});

     return user.save() 
    }).then(()=>{
      res.redirect("/login");
    }).catch(err=>{
      
       return res.status(422).render("auth/signup",{
        pageTitle:'signup',
        isLoggedIn:false,
        errors:[err.message],
        oldInput:{
          FirstName,
          LastName,
          email,
          password,
          userType
        }
      })
    })
    }
]
  
exports.postLogout = (req, res, next) => { 
  req.session.destroy(()=>{
    res.redirect("/login");
  });

};
