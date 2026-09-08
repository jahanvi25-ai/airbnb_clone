const Home = require("../models/home")
const User = require('../models/user')

exports.favouriteList = async (req, res, next) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) {
      return res.redirect('/login');
    }

    const user = await User.findById(userId).populate('favourites');

    if (!user) {
      return req.session.destroy(() => res.redirect('/login'));
    }

    res.render('store/favourite-list', {
      favouriteHomes: user.favourites,
      pageTitle: 'Favourites',
      isLoggedIn: req.isLoggedIn,
      isAdmin: req.isAdmin
    });
  } catch (error) {
    next(error);
  }
};


exports.removeHome = async (req, res,next)=>{
   const homeId= req.params.homeId
    const userId = req.session.user.id;
    const user = await User.findById(userId);
     if(user.favourites.includes(homeId)){
        user.favourites = user.favourites.filter(fav => fav != homeId);
        await user.save();
     } 
      res.redirect('/store/favourite-list');
}

exports.postAddToFavourite = async (req,res,next)=>{
    const homeId = req.body._id;
    const userId = req.session.user.id;
    const user = await User.findById(userId);

    const alreadyFavourite = user.favourites.some((favouriteId) =>
        favouriteId.equals(homeId)
    );

        if (!alreadyFavourite) {
        user.favourites.push(homeId);
        await user.save();
    }

    res.redirect('/store/favourite-list');
    
    }


exports.homeDetail =(req,res,next)=>{
    const homeId = req.params.homeId;
    
    Home.findById(homeId).then((home)=>{
        
        if(home){
            res.render('store/home-detail',{home:home,
                pageTitle:"Home",
                isLoggedIn :req.isLoggedIn,
                isAdmin:req.isAdmin})
            
        }else{res.redirect('/home')}
        
    })

}


exports.bookings =(req,res,next)=>{
res.render('store/bookings',{pageTitle:"Bookings",
    isLoggedIn :req.isLoggedIn,
    isAdmin:req.isAdmin})
}

exports.reserve =(req,res,next)=>{
res.render('store/reserve',{pageTitle:"Reserves",
    isLoggedIn :req.isLoggedIn,
    isAdmin:req.isAdmin})
}

exports.home = (req,res,next)=>{

    const registeredHomes = Home.find().then(( registeredHomes)=>{
           console.log('session value', req.session)
        res.render('store/home',{registeredHomes,pageTitle:'Home',
            isLoggedIn :req.isLoggedIn,
            isAdmin:req.isAdmin})
} )
}


