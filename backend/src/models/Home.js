const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  homeName: { type: String, required: true },
  homePrice: { type: Number, required: true },
  homeLocation: { type: String, required: true },
  homeRating: { type: Number, required: true },
  photoURL: { type: String, required: true },
  // NOTE: "homeDiscription" is a typo carried over from the original schema.
  // Kept as-is on purpose — renaming it would silently orphan the field on
  // every home already saved in the database. Rename in a proper migration
  // later if you want it fixed, not by just editing this line.
  homeDiscription: String,
});

module.exports = mongoose.model("Home", homeSchema);
