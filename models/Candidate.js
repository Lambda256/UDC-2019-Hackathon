var mongoose = require("mongoose");

// schema
var candidateSchema = mongoose.Schema({
    userName:{type:String, required:[true,"UserName is required!"]},
    candidateId:{type:String, required:[true,"CandidateId is required!"]},
    candidateURL:{type:String, required:[true,"CandidateURL is required!"]},
});

// model & export
var Candidate = mongoose.model("candidate", candidateSchema);
module.exports = Candidate;