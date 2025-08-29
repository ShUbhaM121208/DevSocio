const express = require('express');

const app = express();
const {adminAuth,userAuth} = require('./middlewares/auth')

app.use("/admin",adminAuth);
app.post('/user/login',(res,req)=>{
    res.send('hello');

});
app.get('/user/data',userAuth,(req,res) => {
    res.send('user data send');
})
app.get('/admin/getAllData',(req,res)=>{
    res.send("all data send");
})

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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});