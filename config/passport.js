var passport   = require("passport");
var LocalStrategy = require("passport-local").Strategy; // 1
var User     = require("../models/User");


//serialize & deserialize User // 2
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(ID, done) {
    User.findOne({_id:ID}, function(err, user) {
     done(err, user);
    });
});

// local strategy // 3
passport.use("local",
 new LocalStrategy({
   usernameField : "ID", // 3-1
   passwordField : "password", // 3-1
   passReqToCallback : true
  },
  function(req, ID, password, done) { // 3-2
   User.findOne({ID:ID})
   .select({password:1})
   .exec(function(err, user) {
    if (err){ 
        return done(err);
    }
    if (user && user.authenticate(password)){ // 3-3
        return done(null, user);
    } else {
        req.flash("ID", ID);
        req.flash("errors", {login:"Incorrect ID or password"});
        return done(null, false);
    }
   });
  }
 )
);

module.exports = passport;