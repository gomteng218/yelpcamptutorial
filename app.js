var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comments        = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
    
// REQUIRING ROUTES    
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes      = require("./routes/index");

//mongoose.connect("mongodb://localhost/yelpcamp1");
mongoose.connect("mongodb://gom218:gomgom1@ds059215.mongolab.com:59215/yelpcamptutorial");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //Seed the database

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Pil is the best person!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to note all current user variables
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");// flash
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes); //reduce unnecessary /campgrounds...

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Running");
});