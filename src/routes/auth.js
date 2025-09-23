const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const {validateSignUpData} = require('../utlis/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userAuth} = require('../middlewares/auth');




authRouter.post("/signup",async(req,res) =>{
    //  Validation
    try{
    validateSignUpData(req); 
//  ecncrypt the password 
const {firstName,lastName,emailId,password} = req.body;

const passwordHash = await bcrypt.hash(password,10);
    const user = new User(
        {
            firstName,
            lastName,
            emailId,
            password : passwordHash,
        }
    );
    await user.save();
    res.send("user signed up");
    }
    catch(err){
        console.log(err);
        res.status(400).send("Error signing up user");
    }
});

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if (!user){
            throw new Error("user not found");
        }
        const isPasswordMatch = await user.validatePassword(password);
        if (isPasswordMatch){
            // create a jwt Token
            const token = await user.getJWT()
            
            // console.log(token);
 
            // add the token to cookie and send the response back to the user 
            res.cookie("token",token,{
                expires : new Date(Date.now() + 3600000), // 1 hour
            });
            res.status(200).send("user logged in successfully");
        }
        else{
            throw new Error("invalid credentials");
        }
        
    }
    catch(err){
            res.status(400).send("Error logging in user");

    }
});
authRouter.post("/logout",async(req,res)=>{
    try{
        res.clearCookie("token",null,{
            expires : new Date(Date.now()),
        });           
        res.status(200).send("user logged out successfully");
    }
    catch(err){
        res.status(400).send("Error logging out user");
    }
}); 
module.exports = authRouter;