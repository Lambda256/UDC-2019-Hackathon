var mongoose = require("mongoose");
var util  = require("../util"); // 1

var eventSchema = mongoose.Schema({ // 1
    title:{type:String, required:[true,"Title is required!"]}, // 2
    body:{type:String, required:[true,"Body is required!"]}, // 2
    author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    createdAt:{type:Date, default:Date.now}, // 2
    updatedAt:{type:Date},
    likes:{type:Number, default:0},
    likeIDs:[{
      ID:String
    }]
  },{
    toObject:{virtuals:true} // 4
  });


var Event = mongoose.model("event", eventSchema);
module.exports = Event;