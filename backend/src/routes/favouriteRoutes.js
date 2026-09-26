const express = require("express");
const {
  listFavourites,
  addFavourite,
  removeFavourite,
} = require("../controllers/favouriteController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get("/", listFavourites);
router.post("/", addFavourite);
router.delete("/:homeId", removeFavourite);

module.exports = router;
