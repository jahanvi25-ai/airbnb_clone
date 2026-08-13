const mongoose = require("mongoose")

const favouriteSchema = mongoose.Schema({
    homeId: {type : mongoose.Schema.Types.ObjectId,
            ref :'Home',
            required : true,
            unique : true
    },

})

// exports.Favourite = class Favourite{
  
//     
   
//    saveToFavourites() {
//     const db = getDB();

//     return db.collection('favourites')
//         .fetchAllOne({ homeID: this.homeID })
//         .then(existing => {
//             if (existing) {
//                 return existing;
//             }

//             return db.collection('favourites')
//                 .insertOne(this);
//         });
// }
   

   
//     static fetchAllFavourite() {
//     const db = getDB();

//     return db.collection('favourites')
//         .fetchAll()
//         .toArray()
//         .then(favourites => {
          
//             const homeIds = favourites.map(fav => fav.homeID);
            

//             return db.collection('homes')
//                 .fetchAll({ _id: { $in: homeIds } })
//                 .toArray();
//         });
// }
    

//    static removeById(homeId){
    

//       const db = getDB();
//       return db.collection('favourites').deleteOne({
//         homeID:new ObjectId(homeId)
//       })
//      }
//     }

    
module.exports = mongoose.model('Favourite',favouriteSchema)