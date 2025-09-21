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
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (isPasswordMatch){
            // create a jwt Token
            const token = await jwt.sign({_id : user._id}, "mysecretkey");
            // console.log(token);


            // add the token to cookie and send the response back to the user 
            res.cookie("token",token);
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
        const cookies = req.cookies;  // correct
        const { token } = cookies || {}; // safe destructuring

        if (!token) {
            return res.status(401).send("No token found");
        }

        const decoded = jwt.verify(token, "mysecretkey");  // verify token
        const { _id } = decoded;

        const user = await User.findById(_id);  // fetch user
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(user);  // send user profile
    } catch (err) {
        console.error(err);
        res.status(401).send("Unauthenticated");
    }
});

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId : userEmail});
        if (users.length === 0) {
            return res.status(404).send("User not found");
        }
        else{
            return res.status(200).send(users);
        }
        
    }
    catch(err){
        console.log(err);
    }
})
app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        console.log(err);   
    }
     
})
app.delete("/user",async(res,req)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted");


    }
    catch(err){
        console.log(err);
    }

})

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

 

  try {
    const allowedUpdates = ["firstName", "lastName", "emailId", "password", "age"];
    const isUpdateAloowed = Object.keys(data).every((k)=>
    allowedUpdates.includes(k)

);
    if (!isUpdateAloowed) {
    throw new Error("Invalid updates!");
    }
    if (data?.skills?.length > 10) {
        throw new Error("Cannot add more than 5 skills");
    }
    const user = await User.findByIdAndUpdate(
      { _id: userId }, 
      data, 
      { new: true, runValidators: true }  
    );
    res.send("user updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});


connectDB()
    .then(() =>{console.log("Database connected");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => console.log("Database connection error:", err));

