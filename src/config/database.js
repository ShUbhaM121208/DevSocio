const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://shubhamm0010_db_user:GZcSGeRg8d3cIsPJ@cluster0.yghliwg.mongodb.net/");

};
module.exports = connectDB;