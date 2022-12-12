const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    // email:{type:String, unique:true},
    email:String,
    password:String,
    age:Number
},{
    versionKey:false
})


const UserModel = mongoose.model("user",userSchema);

module.exports = { UserModel };