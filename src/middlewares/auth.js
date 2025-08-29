const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting");
    const token = 'xyz';
    const isAdminAuth = token ==='xyz';
    if(!isAdminAuth){
        res.status(401).send("unauthorized");
    }
    else{
        next();
    }
};
const userAuth = (req,res,next) =>{
    console.log("Admin auth is getting");
    const token = 'xyz';
    const isuserAuth = token ==='xyz';
    if(!isAdminAuth){
        res.status(401).send("unauthorized");
    }
    else{
        next();
    }
};
module.exports = {
    adminAuth,userAuth
}