const express = require('express');
const profileRouter = express.Router();
const jwt = require('jsonwebtoken');
const {userAuth} = require('../middlewares/auth');
const {validateEditProfileData} = require('../utlis/validation');


profileRouter.get("/profile",userAuth,  async (req, res) => {
    try {
        const user = req.user;  // fetch user

        res.status(200).send(user);  // send user profile
    } catch (err) {
        // console.error(err);
        res.status(401).send("Unauthenticated");
    }
});
profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit fields");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.status(200).send(loggedInUser);
        
    }
    
    catch(err){
        return res.status(400).send({error : err.message});
    }
});
module.exports = profileRouter;