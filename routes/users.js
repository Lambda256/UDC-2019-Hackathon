var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");
var headers = require("../config/headers")
var client = require("../config/client");
// Index

router.get("/", util.isLoggedin, function(req, res){
    User.find({})
    .exec(function(err, users){
     if(err) return res.json(err);
     res.render("../views/users/users", {users:users});
    });
});

router.get("/new", function(req, res){
    var user = req.flash("user")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render("/", { user:user, errors:errors });
});
   


// show
router.get("/:ID", util.isLoggedin, function(req, res){
    User.findOne({ID:req.params.ID}, function(err, user){
     if(err) return res.json(err);
     res.render("users/show", {user:user});
    });
});


router.get("/mypage/:ID", util.isLoggedin, function(req, res){
    
    User.findOne( { ID : req.params.ID}, function(err, user){
        if(err){
            req.flash("post", req.body);
            req.flash("errors", util.parseError(err));
            return res.redirect("/");
        }

        var api = { 
            headers : headers
        };
        console.log(user);
        client.get("https://api.luniverse.io/tx/v1.0/wallets/" + user.ID +"/RGCM/RGC/balance", api, function(data, re){
            return res.render("../views/mypage",{
                user: user,
                RGC : data.balance,
                title: "regam mypage"
            });
        });

        
    });
});


module.exports = router;

function checkPermission(req, res, next){
    User.findOne({username:req.params.username}, function(err, user){
     if(err) return res.json(err);
     if(user.id != req.user.id) return util.noPermission(req, res);
   
     next();
    });
}