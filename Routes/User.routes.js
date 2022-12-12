const express = require("express")
const bcrypt = require("bcrypt");
const saltRounds = 4;
const { UserModel } = require("../Models/User.model")
require("dotenv").config()

const jwt = require("jsonwebtoken")


const userRoutes = express.Router()

userRoutes.post("/signup", async(req,res) => {
    const {name, email, password, age} = req.body;
    
    const userPresent = await UserModel.findOne({email})
    if(userPresent){
        // console.log(userPresent)
        res.send("Already Signed-Up, Try Login")
    }
    else{
        try {
            bcrypt.hash(password, saltRounds, async(err,myPassword) => {
                const user = new UserModel({name,email,password:myPassword,age})
                await user.save()
                console.log("Sign-up req success")
                res.send("Signup Successfully")
            })
            
        }
        
        catch (error) {
            console.log("Error while making POST req")
            console.log(error)
            res.send("Signup failed")
        }
    }
    
})


userRoutes.post("/login", async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.find({email});
        if(user.length>0){
            const myPassword =  user[0].password;
            console.log(myPassword)
            bcrypt.compare(password,myPassword, function (err,result) {
                if(result){
            const token = jwt.sign({msg:"hey from Amit"}, process.env.secret_key,{expiresIn: '1d'})
            res.send({token, message:"Logged-in Successfully"});
                }
                else{
                    res.send("Wrong Password")
                }
            })
            
        }
        else{
            res.send("Login failed")
        }
       
    } 
    
    catch (error) {
        console.log("Error while making POST req")
        console.log(error)
        res.send("Login failed")
    }
})




module.exports = { userRoutes };