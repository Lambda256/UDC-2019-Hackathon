var express = require("express");
var router = express.Router();
var passport= require("../config/passport");

//home
router.get("/", function(req, res){
    res.render("../views/home/home");
});

router.get("/login", function(req, res){
    var ID = req.flash("ID")[0];
    var errors = req.flash("errors")[0] || {};
    res.render("login/login", {
        ID:ID,
        errors:errors
    });
});


// Post Login
router.post("/login",
    function(req,res,next){
        var errors = {};
        var isValid = true;

        if(!req.body.ID){
            isValid = false;
            errors.ID = "ID is required!";
        }
        if(!req.body.password){
            isValid = false;
            errors.password = "Password is required!";
        }
        if(isValid){
            next();
        } else{
            req.flash("errors", errors);
            res.redirect("/login");
        }
    },
    passport.authenticate("local", {
        successRedirect : "/",
        failureRedirect : "/login"
    }
));

//Logout // 4
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})



module.exports = router;