const express = require('express');

const app = express();
const User = require('./models/user');
const {validateSignUpData} = require('./utlis/validation');
const bcrypt = require('bcrypt');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser());
app.use(express.json());
const{userAuth} = require('./middlewares/auth');

app.post("/signup",async(req,res) =>{
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
app.post("/login",async(req,res)=>{
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
app.get("/profile",userAuth,  async (req, res) => {
    try {
        // const cookies = req.cookies;  // correct
        // const { token } = cookies || {}; // safe destructuring

        // if (!token) {
        //     return res.status(401).send("No token found");
        // }

        // const decoded = jwt.verify(token, "mysecretkey");  // verify token
        // const { _id } = decoded;

        const user = req.user;  // fetch user

        res.status(200).send(user);  // send user profile
    } catch (err) {
        // console.error(err);
        res.status(401).send("Unauthenticated");
    }
});

app.post("/sendConnectionRequest",userAuth,async(req,res) =>{
    console.log("sending request");

    res.send("request sent");
});

connectDB()
    .then(() =>{console.log("Database connected");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => console.log("Database connection error:", err));

