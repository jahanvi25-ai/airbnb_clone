const User = require("../models/User");



exports.listFavourites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("favourites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ favourites: user.favourites });
  } catch (err) {
    next(err);
  }
};

exports.addFavourite = async (req, res, next) => {
  try {
    const { homeId } = req.body;
    const user = await User.findById(req.user.id);

    const alreadyFavourite = user.favourites.some((favId) => favId.equals(homeId));
    if (!alreadyFavourite) {
      user.favourites.push(homeId);
      await user.save();
    }

    res.json({ favourites: user.favourites });
  } catch (err) {
    next(err);
  }
};

exports.removeFavourite = async (req, res, next) => {
  try {
    const { homeId } = req.params;
    const user = await User.findById(req.user.id);

    user.favourites = user.favourites.filter((favId) => favId.toString() !== homeId);
    await user.save();

    res.json({ favourites: user.favourites });
  } catch (err) {
    next(err);
  }
};
