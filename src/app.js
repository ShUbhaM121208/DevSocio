const express = require('express');

const app = express();


app.use("/",(req, res) => {
    res.send('Hello World hum first');
});

app.use("/yo",(req, res) => {
    res.send('hum first');
});
app.use("/wassup",(req, res) => {
    res.send('m first');
});
app.use("/lessgo",(req, res) => {
    res.send('Herst');
});
app.use("/hmmm",(req, res) => {
    res.send('Hello');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});