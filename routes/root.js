var express = require("express");
var router = express.Router();
var passport= require("../config/passport");
var util = require("../util");
var User = require("../models/User");
var headers = require("../config/headers");
var client = require("../config/client");

router.get("/", util.isLoggedin, function(req, res){

    res.render("../views/root_index",{
        title:"Regam Root",
        ID : req.body.ID
    });
})

router.get("/indep_board", function(req, res){
    res.render("../views/root_independence_board",{
        title:"Root Independence Board"
    });
})


module.exports = router;