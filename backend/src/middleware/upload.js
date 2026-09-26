const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Photos now upload straight to Cloudinary instead of the local disk —
// Render's filesystem is ephemeral, so anything saved to local /uploads
// disappears on the next redeploy/restart. Cloudinary storage persists
// independently of the server.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "airbnb-clone",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;
