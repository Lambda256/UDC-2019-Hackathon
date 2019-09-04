var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// schema // 1
var userSchema = mongoose.Schema({
    ID:{type:String, required:[true, "ID is required!"], trim:true, unique:true},
    password:{type:String, required:[true, "Password is required!"], select:false},
    badge:{type:Number, default:0},
    ggow:{type:Number, default:0},
    ggrt:{type:Number, default:0},
    gold:{type:Number, default:0}
},{
    toObject:{virtuals:true}
});

// virtuals // 2

userSchema.virtual("passwordConfirmation")
.get(function(){return this._passwordConfirmation;})
.set(function(value){ this._passwordConfirmation = value;});

userSchema.virtual("originalPassword")
.get(function(){ return this._originalPassword; })
.set(function(value){ this._originalPassword = value;});

userSchema.virtual("currentPassword")
.get(function(){ return this._currentPassword; })
.set(function(value){ this._currentPassword=value; });

userSchema.virtual("newPassword")
.get(function(){ return this._newPassword; })
.set(function(value){ this._newPassword=value; });



userSchema.path("password").validate(function(v){
    var user = this;
 // create user // 3-3
    if(user.isNew){ // 3-2
        if(!user.passwordConfirmation){
        user.invalidate("passwordConfirmation", "Password Confirmation is required!");
        }
        if(user.password !== user.passwordConfirmation) {
        user.invalidate("passwordConfirmation", "Password Confirmation does not matched!");
        }
    }
  
   // update user // 3-4
   if(!user.isNew){
    if(!user.currentPassword){
     user.invalidate("currentPassword", "Current Password is required!");
    }
    if(user.currentPassword && !bcrypt.compareSync(user.currentPassword, user.originalPassword)){ // 2
     user.invalidate("currentPassword", "Current Password is invalid!");
    }
    if(user.newPassword !== user.passwordConfirmation) {
     user.invalidate("passwordConfirmation", "Password Confirmation does not matched!");
    }
   }
});
  
  // hash password // 3
userSchema.pre("save", function (next){
    var user = this;
    if(!user.isModified("password")){ // 3-1
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password); // 3-2
        return next();
    }
});
  
  // model methods // 4
userSchema.methods.authenticate = function (password) {
    var user = this;
    return bcrypt.compareSync( password , user.password);
};

  // model & export
var User = mongoose.model("user",userSchema);
module.exports = User;