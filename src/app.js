const express = require('express');

const app = express();

app.get('/user',(req,res)=>{
    res.send({firstName : "Akshay",lastName:'kumar'})
})
app.post('/user',(req,res)=>{
    res.send('database ')
})


app.use("/test",(req, res) => {
    res.send('Hello World hum first');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});