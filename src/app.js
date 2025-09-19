const express = require('express');

const app = express();
const User = require('./models/user');

const connectDB = require('./config/database');
app.use(express.json());

app.post("/signup",async(req,res) =>{
    const user = new User(req.body);
    await user.save();
    res.send("user signed up");

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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    await User.findByIdAndUpdate(
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

// app.use("/admin",adminAuth);
// app.post('/user/login',(res,req)=>{
//     res.send('hello');

// });
// app.get('/user/data',userAuth,(req,res) => {
//     res.send('user data send');
// })
// app.get('/admin/getAllData',(req,res)=>{
//     res.send("all data send"); 
// })

// app.use('/user',(req,res,next) =>{
//     console.log("111");
//     next()
//     res.send('1');
// },(req,res,next) =>{
//     console.log("121");
//     next()
//     res.send('1');}
// ,(req,res,next) =>{
//     console.log("1581");
//     res.send('2222');
// }
// )

// app.get('/user',(req,res)=>{
//     res.send({firstName : "Akshay",lastName:'kumar'})
// })
// app.post('/user',(req,res)=>{
//     res.send('database ')
// }) 


// app.use("/test",(req, res) => {
//     res.send('Hello World hum first');
// });


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });