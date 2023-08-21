const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    confirmpass:{
        type:String,
        required:true
    },
},{
    versionKey:false
});

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}