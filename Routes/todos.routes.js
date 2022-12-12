const express = require("express")
const { TodoModel } = require("../Models/todo.model")

const todoRoutes = express.Router()


todoRoutes.get("/", async(req,res) => {

    try {
        const todos = await TodoModel.find()
        console.log("All the todos are showing here")
        res.send(todos)
    } 
    
    catch (error) {
        console.log("Error while making GET req")
        console.log(error)
        res.send("Something went wrong, Please try after sometime")
    }
})

todoRoutes.post("/create", async(req,res) => {
    
    try {
        const payload = req.body;
        const todo = new TodoModel(payload)
        await todo.save();
        console.log("Todo Post req successful")
        res.send("Todo Added Successfully")
    } 
    
    catch (error) {
        console.log("Error while making GET req")
        console.log(error)
        res.send("Something went wrong, Please try after sometime")
    }
})



todoRoutes.patch("/edit/:todoID", async(req,res) => {
    try {
        const todoID = req.params.todoID;
        const payload = req.body;
        await TodoModel.findByIdAndUpdate(todoID,payload);
        res.send("Todo is updated Successfully")
    } 
    
    catch (error) {
        console.log("Error while making GET req")
        console.log(error)
        res.send("Something went wrong, Please try after sometime")
    }
})


todoRoutes.delete("/delete/:todoID", async(req,res) => {
    try {
        const todoID = req.params.todoID;
        await TodoModel.deleteOne({_id:todoID});
        res.send("Todo Deleted Successsfully")
    } 
    
    catch (error) {
        console.log("Error while making GET req")
        console.log(error)
        res.send("Something went wrong, Please try after sometime")
    }
})



module.exports = { todoRoutes };