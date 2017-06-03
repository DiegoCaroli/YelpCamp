var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    Comment         = require("./models/comment"),
    methodOverride = require("method-override"),
    seedDB          = require("./seeds");
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v13";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

    // Campground.create({
    //     name: "Granite Hill",
    //     image: "https://farm9.staticflickr.com/8038/7930463550_42c3f82870.jpg",
    //     description: "This is a huge granite hill, no bathroom. No water. Beautiful granite!"
    //     }, function(err, campground) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         //redirect back to campgrounds page
    //         console.log(campground)
    //     }
    // });

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The Server has started!!!"); 
});