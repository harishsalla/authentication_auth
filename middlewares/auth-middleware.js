const jwt=require('jsonwebtoken')
// const User=require('../models/user')
const db=require("../config/config")
const User=db.user



const checkUserAuth= async(req,res,next)=>{
    let token;
    const {authorization}=req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token=authorization.split(" ")[1]
            console.log("hi")
            const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
            console.log(userID);
            console.log("check point -2 ")
            const user = await User.findOne({
                where: { id: userID }, 
                attributes: { exclude: ['password'] },
              });
              console.log(user)
              if(!user){
                return res.status(400).send({"status":"failed","message":"unauthorizedUser"})
              }
            req.user=user;
            console.log("check point -1"); 
            next()
        }catch(error){
            console.log(error)
            res.status(400).send({"status":"failed","message":"unauthorizedUser"})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","message":"Unotherized user no token"})
    }
}

module.exports={
    checkUserAuth
}
