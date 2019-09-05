var express = require("express");
var router = express.Router();
var passport= require("../config/passport");
var util = require("../util");
var User = require("../models/User");
var headers = require("../config/headers");
var client = require("../config/client");


router.get("/:ID", util.isLoggedin, function(req, res){

    User.findOne( { ID : req.params.ID}, function(err, user){
        if(err){
            req.flash("post", req.body);
            req.flash("errors", util.parseError(err));
            return res.redirect("/");
        }

        var api = {
            //headers : headers
            headers : {
                "Content-Type" : "application/json", 
                "Authorization" : "Bearer 234g9KRjrtLhynvKLeUg6KzSjitxakVsBJPzLUzcRDRp8Uuwx1nxKPyeBqC39cLo"
            },
        };
        //console.log(user);
        client.get("https://api.luniverse.net/tx/v1.0/wallets/" + user.ID +"/MRGC/RGC/balance", api, function(data, re){
            console.log(user.ID);
            console.log(data);
            return res.render("../views/mypage",{
                user: user,
                RGC : data.balance,
                title: "regam mypage",
                ID: req.user.ID
            });
        });

        
    });
});





////////////////////////////////////////////////////////////////////////////



module.exports = router;
