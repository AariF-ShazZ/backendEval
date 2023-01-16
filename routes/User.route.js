const express =  require("express")
require("dotenv").config()
const jwt =  require("jsonwebtoken")
const bcrypt = require('bcrypt');
const {UserModel} =  require("../models/Users.model")
const userRoutes =  express.Router()


userRoutes.post("/register",async(req,res) =>{
    const {email,password,name,age} = req.body
    try{
        bcrypt.hash(password, 5, async(err, hash) => {
            // Store hash in your password DB.
            if(err){
                console.log(err);
            }else {
                const user =  new UserModel({email,password:hash,name,age})
                await user.save()
                res.send("Register successfull!")
            }
        
        });
      
    }catch(err){
        res.send("Error in registering the user")
        console.log(err);
    }
})
 
userRoutes.post("/login",async(req,res) =>{
    const {email,password} = req.body
    try{
        const user =  await UserModel.find({email})
       
        console.log("user =>",user);
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)  => {
                // result == true
                if(result){
                    const token = jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"Login successfull!","token":token})
                }else {
                    res.send("Invalid credentials")
                }
            });   
        }else{
            res.send("Wrong credentials")
        }
    }catch(err){
        res.send("Something went wrong")
        console.log(err);
    }
    
})


module.exports = {userRoutes}