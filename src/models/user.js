const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        minLength : 2,
        maxLength : 30,
        },
    
    lastName :{
        type : String
    },
    emailId :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true,
    },
    password :{
        type : String,
        required : true,
    },
    age :{
        type : Number,
        min:18,
        
    },
    gender:{
        type : String,
        validate(value){
            if (!["male","female","other"].includes(value)){
                throw new Error("gender data is not valid");
        }

    
    }},

    photoUrl:{
        type : String,
    },
    about:{

        type : String,
        default : "Hey there! I am using DevTinder",
    },
    skills:{
        type:[String],
    },
    
},{
    timestamps : true,
});
const User = mongoose.model('User',userSchema);
module.exports = User; 