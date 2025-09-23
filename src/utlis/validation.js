const validator = require('validator');

const validateSignUpData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if (!firstName || !lastName ) {
        throw new Error('First name and last name are required.');
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error('Invalid email format.');
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error('Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.');
    }

    
}
const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "age",
        "emailId",
        "photoUrl",
        "gender",
        "about",
        "skills",
    ]
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
    if (!isEditAllowed){
        throw new Error("Invalid edit fields");
    }
    return isEditAllowed;


}
module.exports = {validateSignUpData
,validateEditProfileData
};