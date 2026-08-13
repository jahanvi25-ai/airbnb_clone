//core module
const path = require("path")
//external module
const express = require("express");
const hostRouter = express.Router();
const multer = require('multer');


//local module
const rootdir = require("../utils/pathUtil")
const {getAddHome} = require('../controllers/adminControllers')
const {postAddHome} = require('../controllers/adminControllers')
const {adminHomeList} = require("../controllers/adminControllers")
const {getEditHome} = require("../controllers/adminControllers")
const {postEditHome} = require("../controllers/adminControllers")
const {deleteHome} = require("../controllers/adminControllers")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


hostRouter.get("/admin/admin-home-list",adminHomeList)
hostRouter.get("/admin/add-home",getAddHome)
hostRouter.post('/admin/add-home',upload.single('photo'),postAddHome);
hostRouter.get("/admin/edit-home/:homeId",getEditHome)
hostRouter.post("/admin/edit-home",upload.single('photo'),postEditHome)
hostRouter.post("/admin/delete-home/:homeId",deleteHome)


exports.hostRouter = hostRouter;
