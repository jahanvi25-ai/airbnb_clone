const path = require("path");
const multer = require("multer");

// Original app configured multer with field name "photo" but the actual
// edit-home form used a text input named "photoURL" — the file upload was
// wired up but never actually reachable. This fixes that: the frontend now
// sends a real file under "photo", and homeController falls back to a
// plain photoURL string if no file is attached (e.g. pasting an image link).
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
