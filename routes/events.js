var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");
var headers = require("../config/headers");
var addresses = require("../config/addresses");
var client = require("../config/client");

router.get("/",util.isLoggedin, function(req, res){
    Event.find({})
    .populate("author")                  // 1
    .sort("-likes")            // 1
    .exec(function(err, events){    // 1
      if(err) return res.json(err);
      res.render("../views/overwatch_board", {
        title:"Regam Overwatch Event Board",
        ID:req.body.ID,
        events:events});
    });
  });
  
// New
router.get("/new", util.isLoggedin, function(req, res){
    var events = req.flash("events")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render("../events/new", { 
      title:"Regam Overwatch New Event suggest writing",
      events:events, 
      errors:errors });
});
    

// create
router.post("/", util.isLoggedin, function(req, res){
  req.body.author = req.user.id;
    Post.create(req.body, function(err, post){
      if(err){
      req.flash("EVENTS", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/events/new");
      }
      res.redirect("/events");
  });
});


module.exports = router;