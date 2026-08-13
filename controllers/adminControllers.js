const Home = require("../models/home")


exports.getAddHome =(req,res,next)=>{
res.render('admin/edit-home',{pageTitle:"register Home",isAdmin:true, editing:false,isLoggedIn:req.isLoggedIn, home:{}})
}

exports.getEditHome =(req,res,next)=>{
    const homeId = req.params.homeId;
    const editing = true
    Home.findById(homeId).then((home)=>{
        
        if(!home){
            return res.redirect('/admin/admin-home-list')
        }

        res.render('admin/edit-home',
            {pageTitle:"Edit-home",
                isAdmin:true,
                isLoggedIn :req.isLoggedIn,
                editing,
                home})
    })
}

exports.postAddHome=(req,res,next)=>{
    const {homeName,homePrice,homeLocation,homeRating,photoURL,homeDiscription} = req.body
    
    const home = new Home({homeName,homePrice,homeLocation,homeRating,photoURL,homeDiscription});
    
    home.save().then(()=>{
      console.log('home saved successfully');
    });
   
res.render('admin/homeAdded',{pageTitle:"successfull",
  isLoggedIn :req.isLoggedIn,
  isAdmin:true})
}

exports.postEditHome = (req,res,next)=>{
 const {_id,homeName,homePrice,homeLocation,homeRating,photoURL,homeDiscription} = req.body;
  
 
  Home.findById(_id).then((home)=>{
    home.homeName = homeName,
    home.homePrice = homePrice,
    home.homeLocation = homeLocation,
    home.homeRating = homeRating,
    home.photoURL = photoURL,
    home.homeDiscription = homeDiscription,
    home.save().then((result)=>{
      console.log('home updated',result)
        res.redirect('/admin/admin-home-list')
    }).catch(error=>{
      console.log('error while updating the home',error)
    });
  });
  
};

exports.adminHomeList = (req,res,next)=>{
       const registeredHomes = Home.find().then(( registeredHomes)=>{
           
        res.render('admin/admin-home-list',{registeredHomes,pageTitle:'admin-home-list',
          isLoggedIn :req.isLoggedIn,
          isAdmin:true})
})
} 

exports.editHome =(req,res,next)=>{
res.render('admin/edit-home',{pageTitle:"Edit-Home",
  isAdmin:true, 
  isLoggedIn :req.isLoggedIn,
  editing:false, home:{}})
}

exports.deleteHome = (req,res,next)=>{
const homeId = req.params.homeId;
Home.findByIdAndDelete(homeId).then((home)=>{

    res.redirect('/admin/admin-home-list')
}
).catch(error=>{
        console.log("error while deleting",error) 
})
}


