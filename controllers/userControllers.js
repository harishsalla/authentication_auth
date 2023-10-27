const db=require("../config/config")
const User=db.user

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {Sequelize,DataTypes}=require("sequelize");



const userRegistration= async(req,res)=>{

    // console.log(
    const {name,email,password,password_conformation,tc}=req.body
    console.log(name,email,password)
    const user= await User.findOne({
        where: {
            email:email
          }
    });

    if (user){
        res.send({"status":"failed",'message':"email-already-exits"})
    }
    else{
        if(name && email && password && password_conformation && tc){
            if(password===password_conformation){
                try{
                    const salt=await bcrypt.genSalt(10)
                    const hashPassword=await bcrypt.hash(password,salt)
                    const doc=User.create({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    })
                    const saved_user=User.findOne({
                        where:{
                            email:email
                        }
                    })
                    // generate jwttoken
                    const token=jwt.sign({userID:saved_user.id},process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
                    res.status(200).json({message:"registered successfully","token":token})
                }
                catch(error){
                    console.log(error)
                    res.send({"status":"failed","message":"Password and Confirm Password doesn't match"})

                }
            }else{
                res.send({"status":"failed","message":"Password and confirm Password does't match"})
            }

        }else{
            console.log("error")
            res.send({"status":"failed","message":"All fields are required"})
        }
    }
}

const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email && password){
            const user=await User.findOne({
                where:{
                    email:email
                }
            })
            if(user!=null){
                const isMatch=await bcrypt.compare(password,user.password)
                if((user.email==email) && isMatch){
                    const token=jwt.sign({userID:user.id},process.env.JWT_SECRET_KEY,{expiresIn:"5d"})
                    res.send({"status":"success","message":"login success","token":token})
                }
                else{
                    res.status(400).json({"status":"error","messsge":"email or password is invalid"})
                }
            }
            else{
                res.status(400).json({"status":"failed","message":"You are not a register user"})
            }
        }
        else{
            res.status(400).json({"status":"failed","message":"All Fields are Required"})
        }
    }
    catch(error){
        console.log(error)
        res.send({"status":"failed","message":"Unable to login"})
    }
}

const changePassword=async(req,res)=>{
    const {password,password_confirmation}=req.body
    if(password && password_confirmation){
        if(password !== password_confirmation){
            res.send({"status":"failed","message":"New Password and Confirm New Password are doesn't match"})
        }
        else{
            const salt=await bcrypt.genSalt(10)
            const newHashedPassword=await bcrypt.hash(password,salt);
            console.log(req.user)
            res.status(400).json({"status":"success","message":"Password changed successfully"})
        }
    }
    else{

        res.status(400).json({"status":"failed","message":"all fields are required"})
    }
}

module.exports={
    userRegistration,userLogin,changePassword
}