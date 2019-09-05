var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");
var headers = require("../config/headers");
var addresses = require("../config/addresses");
var client = require("../config/client");

router.get("/",util.isLoggedin, function(req, res){
    var api = { 
        headers : headers
    };
    console.log(req.user.ID);
    client.get("https://api.luniverse.net/tx/v1.0/wallets/" + req.user.ID +"/MRGC/RGC/balance", api, function(data, re){
        console.log(data);
        return res.render("/overwatch_donate",{
            ID : req.user.ID,
            RGC : data.balance,
            title: "Regam Donate To Overwatch Community"
        });
    });
});


router.post("/:ID", util.isLoggedin, checkPermission, function(req,res){
    const toManager = Math.floor(req.body.value * 0.3);
    const toComm = req.body.value - toManager; 
    
    var apiToComm = {
        headers:headers,
        data:{
            from:{
                userKey : req.params.ID,
                walletType :"LUNIVERSE"
            },
            inputs:{
                receiverAddress:{
                    userKey : addresses.owM,
                    walletType :"LUNIVERSE"
                },
                valueAmount : toComm
            }
        }
    }
    var apiToManger = {
        headers:headers,
        data:{
            from:{
                userKey : req.params.ID,
                walletType :"LUNIVERSE"
            },
            inputs:{
                valueAmount : toManager
            }
        }
    }
    
    client.post("https://api.luniverse.net/tx/v1.0/transactions/donateToComm", api, function(data, re){
        if(data.result != true){
            console.log(data);
            res.redirect("/donate");
        }
        console.log(data);
    })
    client.post("https://api.luniverse.net/tx/v1.0/transactions/donateToManager", api, function(data, re){
        if(data.result != true){
            console.log(data);
            res.redirect("/donate");
        }
        console.log(data);
        return res.redirect("/donate")
    })

});

module.exports = router;

function checkPermission(req, res, next){
    User.findOne({username:req.params.username}, function(err, user){
     if(err) return res.json(err);
     if(user.id != req.user.id) return util.noPermission(req, res);
   
     next();
    });
};