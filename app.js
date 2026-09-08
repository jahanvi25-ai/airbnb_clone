///core module
const path = require("path")

//External module
const express = require("express");
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);

const DB_PATH = 'mongodb+srv://JahanviChauhan:Jahanvi25@airbnbdata.gj3gbjv.mongodb.net/airbnb?appName=airbnbData'

//local module
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootdir = require("./utils/pathUtil")
const {pageNotFound} = require('./controllers/errors');

const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');
app.set('views','views')

const store = new MongodbStore({
    uri: DB_PATH ,
    collection : 'sessions'
})

app.use(express.urlencoded());
app.use(session({
    secret: "Kiteretsu@25",
    resave: false,
    saveUninitialized : true,
    store: store
}

))


app.use((req, res, next) => {
  req.isLoggedIn = Boolean(req.session.isLoggedIn);
  req.isAdmin = req.session.user?.userType === 'host';
  next();
}); 

app.use('/uploads',express.static('uploads'))
app.use((req,res,next)=>{
    res.locals.currentPage = req.path;
    res.locals.isLoggedIn = req.isLoggedIn;
    res.locals.isAdmin = req.isAdmin;
    next()
})
app.use(express.static(path.join(rootdir, 'public')))
app.use(authRouter)
app.use(userRouter)
app.use((req, res, next) => {
    if (req.isLoggedIn && req.isAdmin) return next();
    res.redirect("/login");
}, hostRouter)


app.use(express.static(path.join(rootdir,'public')))

app.use(pageNotFound)


const PORT = 3001;


mongoose.connect(DB_PATH).then(()=>{
    console.log('connected to Mongodb')
      app.listen(PORT,()=>{
    console.log(`server is running at address http://localhost:${PORT}`);
});
}).catch(error=>{
    console.log('error while connecting to Mongodb',error)
})

