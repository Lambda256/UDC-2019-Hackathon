// routes/posts.js

var express = require("express");
var router  = express.Router();
var Post    = require("../models/Post");
var util  = require("../util");
var headers = require("../config/headers");
var client = require("../config/client");

// Index 
router.get("/", function(req, res){
  Post.find({})
  .populate("author")                  // 1
  .sort("-createdAt")            // 1
  .exec(function(err, posts){    // 1
    if(err) return res.json(err);
    res.render("posts/index", {posts:posts});
  });
});

// New
router.get("/new", util.isLoggedin, function(req, res){
    var post = req.flash("post")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render("posts/new", { post:post, errors:errors });
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

// show
router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id}) // 3
 .populate("author")               // 3
 .exec(function(err, post){        // 3
  if(err) return res.json(err);
  res.render("posts/show", {post:post});
  });
});

// edit
router.get("/:id/edit", util.isLoggedin, checkPermission, function(req, res){
    var post = req.flash("post")[0];
    var errors = req.flash("errors")[0] || {};
    if(!post){
     Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render("posts/edit", { post:post, errors:errors });
     });
    } else {
     post._id = req.params.id;
     res.render("posts/edit", { post:post, errors:errors });
    }
});

// update
router.put("/:id",util.isLoggedin, checkPermission, function(req, res){
    req.body.updatedAt = Date.now();
    Post.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true}, function(err, post){
     if(err){
      req.flash("post", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/posts/"+req.params.id+"/edit");
     }
     res.redirect("/posts/"+req.params.id);
    });
   });

// destroy
router.delete("/:id", util.isLoggedin, checkPermission, function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});


// like
router.post("/:id", util.isLoggedin, function(req,res){

  var like;

  Post.findOne({_id:req.params.id}, function(err, post){
    if(err){
      req.flash("post", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/posts/"+req.params.id);
    }
    
    like = post.likes + 1;
    console.log(post);
    console.log(req.user);
    /*
    if(post.likeIDs.indexOf(req.user.ID)> -1){  
      return res.redirect("/posts/"+req.params.id);
    }*/
    
    Post.findOneAndUpdate({_id:req.params.id}, {likes:like, $addToSet:{likeIDs : req.user.ID}})
    .populate("author")
    .exec(function(err,post){
      if(err){
       req.flash("post", req.body);
       req.flash("errors", util.parseError(err));
       return res.redirect("/posts/"+req.params.id);
      }

      var api = { 
        headers : headers,
        data : {
            inputs:{
              receiverAddress:{
                userKey: post.author.ID,
                walletType:"LUNIVERSE"
              }
            }
          }   
      };
      client.post("https://api.luniverse.net/tx/v1.0/transactions/likeReward", api, function(data, res){
        console.log(data);
      });
      console.log(post.author);
      return res.redirect("/posts/"+req.params.id);
     });
  });

  
})


module.exports = router;

function checkPermission(req, res, next){
  Post.findOne({_id:req.params.id}, function(err, post){
   if(err) return res.json(err);
   if(post.author != req.user.id) return util.noPermission(req, res);
 
   next();
  });
 }
