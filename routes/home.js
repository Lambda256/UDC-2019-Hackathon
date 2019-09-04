var express = require("express");
var router = express.Router();
var passport= require("../config/passport");
var util = require("../util");
var User = require("../models/User");
var headers = require("../config/headers");
var client = require("../config/client");


router.get("/login", util.isLoggedin, function(req, res){
    res.render("../views/index_logout",{
        title:"Regam main",
        ID:req.user.ID
    });
});

router.get("/", function(req,res){
    res.render("../views/index",{
        title:"Regam main"
    });
});


router.get("/join", function(req, res){
    res.render("../views/joinus",{
        title:"Regam signUp"
    });
});

router.get("/community_list",util.isLoggedin, function(req,res){
    res.render("../views/community_list",{
        title:"Regam Community List",
        ID:req.user.ID
    });
});

// 회원가입
router.post("/create", function(req, res){
    var api = { 
        headers : headers,
        data : {
            walletType : "LUNIVERSE",
            userKey : req.body.ID
        }
    };

    client.post("https://api.luniverse.net/tx/v1.0/wallets", api, function(data, res){
        console.log(data);
    });


    User.create(req.body, function(err,user){
        if(err){
            req.flash("user", req.body);
            req.flash("errors", util.parseError(err));
            return res.json(err);
        }
        return res.render("../views/welcome",{
            title:"welcome"
        });
        
    });
    
});



//home -----------------------------------------------------------작업해야될것



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
            res.redirect("/");
        }
    },
    passport.authenticate("local", {
        successRedirect : "/login",
        failureRedirect : "/"
    }
));

//Logout // 4
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//////////////////////////////////////////////////////////////훈장

router.get("/badgeStore",util.isLoggedin, function(req ,res){
    res.render("../views/badge_Purchase",{
        title:"Regam Badge Store",
        ID:req.user.ID
    });
});

router.post("/purchase_badge", util.isLoggedin, checkPermission, function(req, res){
    User.findOne({ID:req.user.ID}, function(err,user){
        if(err){
            req.flash("post", req.body);
            req.flash("errors", util.parseError(err));
            return res.redirect("/badgeStore");
        }
        if(user.badge == 1){  // 이미 구입함
            return res.redirect("/badgeStore"); 
        }
        if(user.gold < 100){  // 골드 부족
            return res.redirect("/badgeStore"); 
        }
        User.findOneAndUpdate({ID:req.body.ID}, {badge:1}, function(err,user){
            if(err){
                req.flash("post", req.body);
                req.flash("errors", util.parseError(err));
                return res.redirect("/badgeStore");
            }
            res.render("/views/index",{
                user: user
            });
        })
    })
});
///////////////////////////////////////////////////////////////////////////////


router.get("/new_post", util.isLoggedin, function(req, res){
    var post = req.flash("post")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render("../views/overwatch_new", { 
      title:"Regam Overwatch Posts",
      ID:req.user.ID,
      post:post, 
      errors:errors });
});

/*
router.get("/gold", util.isLoggedin, function(req, res){
    User.findOne({ID:req.params.ID}, function(err,user){
        if(err){
            req.flash("post", req.body);
            req.flash("errors", util.parseError(err));
            return res.redirect("/views/index");
        }
        res.render("/views/",{
            user:user
        });
    });
})
*/
router.post("/gold", util.isLoggedin, checkPermission, function(req,res){
    User.findOne({ID:req.params.ID}, function(err, user){
        if(err){
            req.flash("post", req.body);
            req.flash("errors", util.parseError(err));
            return res.redirect("/gold");
        }
        if(req.body.ggow > user.ggow || req.body.ggrt > user.ggrt){  // gg 부족
            return res.redirect("/gold");
        }
        var newgo = user.ggow - req.body.ggow;
        var newgt = user.ggrt - req.body.ggrt;
        var newgd = user.gold + req.body.ggow + req.body.ggrt;

        User.findOneAndUpdate({ID:req.params.ID}, {ggow: newgo, ggrt : newgt, gold : newgd} , function(err, user){
            if(err){
                req.flash("post", req.body);
                req.flash("errors", util.parseError(err));
                return res.redirect("/gold");
            }
            res.render("/index_logout",{
                user : user
            });
        })
    })
});




module.exports = router;

function checkPermission(req, res, next){
    User.findOne({ID:req.params.ID}, function(err, user){
     if(err) return res.json(err);
     if(user.ID != req.user.ID) return util.noPermission(req, res);
   
     next();
    });
}