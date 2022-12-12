const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:String,
    status:Boolean,
    category:String,
    completeIn:Number
},{
    versionKey:false
})

const TodoModel = mongoose.model("todo",todoSchema);

module.exports = { TodoModel };