var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");
var headers = require("../config/headers");
var client = require("../config/client");

// Index
router.get("/", function(req, res){
    res.render("../views/join/join");
});

router.post("/create", function(req, res){
    var api = { 
        headers : headers,
        data : {
            walletType : "LUNIVERSE",
            userKey : req.user.ID
        }
    };
    client.post("https://api.luniverse.net/tx/v1.0/wallets", api, function(data, res){
        console.log('userID');
        console.log(req.body.id);
        console.log(data);
    });
    

    User.create(req.body, function(err,user){
        if(err){
            req.flash("user", req.body);
            req.flash("errors", util.parseError(err));
            return res.json(err);
        }
        return res.render("../views/join/welcome");
    });
    
});


module.exports = router;
