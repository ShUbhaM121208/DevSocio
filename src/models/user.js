const mongoose = require('mongoose');
const validato = require('validator');

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
        validation(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid");
            }

        }
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
        validation(value){
            if(!validator.isURL(value)){
                throw new Error("photo is not valid");
            }
            
        }
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