const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuth = (req,res,next) =>{
   
};
const userAuth = async(req,res,next) =>{
    // read the token from the req cookies 
    try{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).send("No token found");
    }
    const decodedobj = jwt.verify(token,"mysecretkey",{
        expireIn : "1h",
    });
    const {_id} = decodedobj;
    const user = await User.findById(_id);
    if(!user){
        return res.status(404).send("user not found");
    }
    req.user = user;
    next();
}
catch(err){
    console.log(err);
    return res.status(400).send("Unauthenticated",err.message);
}


    // Validate the token 

    //  find the user 

    
};
module.exports = {
    adminAuth,userAuth
}