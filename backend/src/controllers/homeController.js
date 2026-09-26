const Home = require("../models/Home");
const User = require("../models/User");
// Public — used by both the guest home page AND the host's admin list.
// The frontend decides whether to show Edit/Delete buttons based on the
// logged-in user's role, so there's no need for two separate endpoints
// returning the same data.
exports.listHomes = async (req, res, next) => {
  try {
    const homes = await Home.find();
    res.json({ homes });
  } catch (err) {
    next(err);
  }
};

exports.getHome = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.homeId);
    if (!home) return res.status(404).json({ message: "Home not found" });
    res.json({ home });
  } catch (err) {
    next(err);
  }
};

// Host only. Accepts either a real uploaded file (field "photo") or a
// plain photoURL string in the body — see middleware/upload.js for why.
exports.createHome = async (req, res, next) => {
  try {
    const { homeName, homePrice, homeLocation, homeRating, homeDiscription } = req.body;
    const photoURL = req.file ? `/uploads/${req.file.filename}` : req.body.photoURL;

    if (!photoURL) {
      return res.status(422).json({ message: "A photo (file or URL) is required" });
    }

    const home = new Home({
      homeName,
      homePrice,
      homeLocation,
      homeRating,
      photoURL,
      homeDiscription,
    });
    await home.save();

    res.status(201).json({ home });
  } catch (err) {
    next(err);
  }
};

exports.updateHome = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.homeId);
    if (!home) return res.status(404).json({ message: "Home not found" });

    const { homeName, homePrice, homeLocation, homeRating, homeDiscription } = req.body;
    home.homeName = homeName;
    home.homePrice = homePrice;
    home.homeLocation = homeLocation;
    home.homeRating = homeRating;
    home.homeDiscription = homeDiscription;
    if (req.file) {
      home.photoURL = `/uploads/${req.file.filename}`;
    } else if (req.body.photoURL) {
      home.photoURL = req.body.photoURL;
    }

    await home.save();
    res.json({ home });
  } catch (err) {
    next(err);
  }
};

exports.deleteHome = async (req, res, next) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.homeId);
                
    if (!home) return res.status(404).json({ message: "Home not found" });
     await User.updateMany(
                  {favourites:req.params.homeId},
                  {$pull:{favourites:req.params.homeId}}
                );
    res.json({ message: "Home deleted" });
  } catch (err) {
    next(err);
  }
};
