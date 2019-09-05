var mongoose = require("mongoose");
var util  = require("../util"); // 1

// schema
var indepSchema = mongoose.Schema({ // 1
  title:{type:String, required:[true,"Title is required!"]}, // 2
  body:{type:String, required:[true,"Body is required!"]}, // 2
  author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  createdAt:{type:Date, default:Date.now}, // 2
  updatedAt:{type:Date},
  likes:{type:Number, default:0},
  likeIDs:[{
    type:String
  }]
},{
  toObject:{virtuals:true} // 4
});


indepSchema.virtual("createdDate")
.get(function(){
  return util.getDate(this.createdAt);
});

indepSchema.virtual("createdTime")
.get(function(){
  return util.getTime(this.createdAt);
});

indepSchema.virtual("updatedDate")
.get(function(){
  return util.getDate(this.updatedAt);
});

indepSchema.virtual("updatedTime")
.get(function(){
  return util.getTime(this.updatedAt);
});

var Indep = mongoose.model("indep", indepSchema);
module.exports = Indep;