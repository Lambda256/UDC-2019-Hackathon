var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");
var headers = require("../config/headers");
var addresses = require("../config/addresses");
var client = require("../config/client");
var Candidate = require("../models/Candidate");
var User = require("../models/User");
var blockFunc = require("../func/blockFunc");

router.get("/", util.isLoggedin, function(req,res){
  //console.log(req);  
  res.render("../views/overwatch_index",{
      title:"Regam Overwatch",
      ID:req.user.ID
    });
})

router.get('/overwatch_voting', function (req, res) {
  Candidate.find({})
  .sort("candidateId")
  .exec(function(err, candidates){
     if(err) return res.json(err);
     res.render('overwatch_voting', {
        title: "오버워치 커뮤니티지기 투표",
        length: 5,
        candidateList: candidates,
        ID: req.user.ID
     });
  })
});

router.post('/overwatch_voting', function (req, res) {
  //console.log(req.body);
  var candidateid = parseInt(req.body.candi);
  var username = req.user.ID;

  blockFunc.getCheckVoted(username, function(err, resd){
     if(resd){
        console.log("이미 투표권을 행사했습니다");
     } else {
        blockFunc.setVote(candidateid, username, function(_err, _res) {
           if(_err) {
           console.log("투표를 진행할 수 없습니다");
           } else {
           }
        });
      }
 })
 //res.redirect("/ow/overwatch_voting");
  res.render('overwatch_voting', {
    title: "오버워치 커뮤니티지기 투표",
    length: 5,
    candidateList: candidates,
    ID: req.user.ID
  });
});

router.get('/overwatch_voting/setCandidate/:username/:candidateurl', function (req, res) {
  var username = req.params.username;
  var candidateurl = req.params.candidateurl;

  blockFunc.setCandidate(function(err, candidateid){
     if(!err) {
        Candidate.create({'userName': username, 'candidateId': candidateid, 'candidateURL': candidateurl}, function(err, candidate){
           if(err){
              return res.json(err);
           }
           console.log(candidate);
           res.redirect("/ow/overwatch_voting");
        });
     }
 });
})

//////// 게시판



module.exports = router;

