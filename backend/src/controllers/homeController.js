const Home = require("../models/Home");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// Deletes an image from Cloudinary given its public_id. Safe to call with
// null/undefined — homes with a pasted external photoURL (no Cloudinary
// asset) or old pre-Cloudinary records simply have nothing to clean up.
const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Failed to delete Cloudinary image:", publicId, err.message);
  }
};

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

// Host only. Accepts either a real uploaded file (field "photo", now
// stored on Cloudinary via the multer-storage-cloudinary middleware) or a
// plain photoURL string in the body — see middleware/upload.js for why.
exports.createHome = async (req, res, next) => {
  try {
    const { homeName, homePrice, homeLocation, homeRating, homeDiscription } = req.body;
    const photoURL = req.file ? req.file.path : req.body.photoURL;
    const photoPublicId = req.file ? req.file.filename : null;

    if (!photoURL) {
      return res.status(422).json({ message: "A photo (file or URL) is required" });
    }

    const home = new Home({
      homeName,
      homePrice,
      homeLocation,
      homeRating,
      photoURL,
      photoPublicId,
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

    // Remember the old Cloudinary asset before we overwrite it, so we can
    // delete it once the update actually succeeds.
    const oldPublicId = home.photoPublicId;
    let photoChanged = false;

    const { homeName, homePrice, homeLocation, homeRating, homeDiscription } = req.body;
    home.homeName = homeName;
    home.homePrice = homePrice;
    home.homeLocation = homeLocation;
    home.homeRating = homeRating;
    home.homeDiscription = homeDiscription;

    if (req.file) {
      home.photoURL = req.file.path;
      home.photoPublicId = req.file.filename;
      photoChanged = true;
    } else if (req.body.photoURL && req.body.photoURL !== home.photoURL) {
      home.photoURL = req.body.photoURL;
      home.photoPublicId = null; // pasted URL, nothing for Cloudinary to track
      photoChanged = true;
    }

    await home.save();

    // Only delete the old asset after the save succeeds, and only if the
    // photo actually changed — otherwise a normal text-field edit would
    // wipe out the current, still-in-use image.
    if (photoChanged) {
      await deleteCloudinaryImage(oldPublicId);
    }

    res.json({ home });
  } catch (err) {
    next(err);
  }
};

exports.deleteHome = async (req, res, next) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.homeId);

    if (!home) return res.status(404).json({ message: "Home not found" });

    await deleteCloudinaryImage(home.photoPublicId);

    await User.updateMany(
      { favourites: req.params.homeId },
      { $pull: { favourites: req.params.homeId } }
    );
    res.json({ message: "Home deleted" });
  } catch (err) {
    next(err);
  }
};
