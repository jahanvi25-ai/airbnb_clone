//code module
const path = require("path")
//external module
const express = require("express");
//local module

const {home} = require("../controllers/storeControllers")
const {favouriteList} = require("../controllers/storeControllers")
const {homeDetail} = require("../controllers/storeControllers")
const {reserve} = require("../controllers/storeControllers")
const {bookings }= require("../controllers/storeControllers")
const{postAddToFavourite} = require("../controllers/storeControllers")
const{removeHome} = require("../controllers/storeControllers")

const userRouter = express.Router();

userRouter.get("/",home);
userRouter.get("/store/favourite-list",favouriteList)
userRouter.post("/store/favourite-list",postAddToFavourite)
userRouter.get("/store/home-detail/:homeId",homeDetail);
userRouter.get("/store/bookings",bookings,);
userRouter.get("/store/reserve",reserve);
userRouter.post("/store/remove-home/:homeId",removeHome)
 module.exports = userRouter;
