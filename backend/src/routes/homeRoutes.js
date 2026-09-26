const express = require("express");
const {
  listHomes,
  getHome,
  createHome,
  updateHome,
  deleteHome,
} = require("../controllers/homeController");
const { requireAuth, requireHost } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", listHomes);
router.get("/:homeId", getHome);

// Host-only writes
router.post("/", requireAuth, requireHost, upload.single("photo"), createHome);
router.put("/:homeId", requireAuth, requireHost, upload.single("photo"), updateHome);
router.delete("/:homeId", requireAuth, requireHost, deleteHome);

module.exports = router;
