

const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
  homeName : {type: String,required:true},
  homePrice : {type:Number,required:true},
  homeLocation : {type:String,required:true},
  homeRating : {type:Number,required:true},
  photoURL : {type:String,required:true},
  homeDiscription : String,
})

  // homeSchema.pre('findOneAndDelete',async function(next){
  //   const homeId = this.getQuery()._id;
  //   await favourite.deleteMany({homeId:homeId});
  
  // })

  module.exports = mongoose.model('Home',homeSchema)



