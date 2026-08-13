
//external module
const express = require("express");
//local module
const {getAuth} = require("../controllers/authControllers");
const {postAuth} = require("../controllers/authControllers");
const {postLogout} = require("../controllers/authControllers");
const authRouter = express.Router();

authRouter.get("/login",getAuth);
authRouter.post("/login",postAuth);
authRouter.post("/logout",postLogout);


module.exports = authRouter;