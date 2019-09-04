// routes/posts.js

var express = require("express");
var router  = express.Router();
var Post    = require("../models/Event");
var util  = require("../util");
var headers = require("../config/headers");


router.get("/", function(req, res){
    Event.find({})
    .populate("author")                  // 1
    .sort("-likes")            // 1
    .exec(function(err, events){    // 1
      if(err) return res.json(err);
      res.render("/", {events:events});
    });
  });
  
// New
router.get("/new", util.isLoggedin, function(req, res){
    var events = req.flash("events")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render("posts/new", { events:events, errors:errors });
});
    

// create
router.post("/", util.isLoggedin, function(req, res){
  req.body.author = req.user.id;
    Post.create(req.body, function(err, post){
      if(err){
      req.flash("post", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/posts/new");
      }
      res.redirect("/posts");
  });
});

module.exports = router;