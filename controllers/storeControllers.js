const Home = require("../models/home")
const Favourite = require("../models/favourite")


exports.favouriteList =(req,res,next)=>{
    
    Favourite.find().populate('homeId')
.then(favourites => {
      const favouriteHomes = favourites.map(fav => fav.homeId);
    res.render('store/favourite-list', {
        favouriteHomes:favouriteHomes,
        pageTitle:"Favourites",
        isLoggedIn :req.isLoggedIn,
        isAdmin:false
    }
       );
    }).catch(error=>{
        console.log('error while fetching favourites',error)
    })
    
}


exports.removeHome = (req, res,next)=>{
   const homeId= req.params.homeId
   console.log('id',homeId)
    
    Favourite.findOneAndDelete({homeId:homeId}).then(homeId=>{
        console.log('this record is removed from Favourites',homeId)
        res.redirect("/store/favourite-list")
    }).catch(error=>{
       
            console.log("error while removing from favourites",error)
    })
     
}

exports.postAddToFavourite = (req,res,next)=>{
    const _id = req.body._id
 
    const favourite = new Favourite({homeId:_id})
    Favourite.findOne({homeId:_id}).then(existing=>{
        if(existing){
             res.redirect('/store/favourite-list')
              return existing
        }
        return favourite.save().then((favourite)=>{
            console.log('Added to favourite',favourite)
             res.redirect('/store/favourite-list')
        }).catch(error=>{
            console.log('error while adding to favourite',error)
        })
      
    }).catch(error=>{
    console.log('error while adding to favourite',error)
    });
    
    }


exports.homeDetail =(req,res,next)=>{
    const homeId = req.params.homeId;
    
    Home.findById(homeId).then((home)=>{
        
        if(home){
            res.render('store/home-detail',{home:home,
                pageTitle:"Home",
                isLoggedIn :req.isLoggedIn,
                isAdmin:false})
            
        }else{res.redirect('/home')}
        
    })

}


exports.bookings =(req,res,next)=>{
res.render('store/bookings',{pageTitle:"Bookings",
    isLoggedIn :req.isLoggedIn,
    isAdmin:false})
}

exports.reserve =(req,res,next)=>{
res.render('store/reserve',{pageTitle:"Reserves",
    isLoggedIn :req.isLoggedIn,
    isAdmin:false})
}

exports.home = (req,res,next)=>{

    const registeredHomes = Home.find().then(( registeredHomes)=>{
           console.log('session value', req.session)
        res.render('store/home',{registeredHomes,pageTitle:'Home',
            isLoggedIn :req.isLoggedIn,
            isAdmin:false})
} )
}


