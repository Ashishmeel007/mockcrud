const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {User} = require("../models/user");

const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
    try{
        const {email,pass,confirmpass} = req.body;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(pass)){
            return res.status(400).json({msg:"Password does not meet the requirement"});
        }

        if (pass !== confirmpass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"User already exist"})
        }
        bcrypt.hash(pass,5, async (err,hash)=>{
            if(err){
                res.status(400).json({error:err.message})
            }else{
                const user = new User({email,pass:hash,confirmpass:hash});
                await user.save();
                res.status(200).json({msg:"A new user has been registered",user:req.body})
            }
        }
        )} catch(err){
               res.status(400).json({error:err.message});
    };
});

userRouter.post("/login", async (req,res) =>{
    const {email,pass} = req.body;
    try{
       const user = await User.findOne({email});
       if(user){
         bcrypt.compare(pass,user.pass,(err,result) =>{
             if(result){
                 let token = jwt.sign({userID:user._id},"masai");
                //  localStorage.setItem("token", token);
                 res.status(200).json({msg:"Logged In!!",token})
             }else{
                 res.status(400).json({msg:"Wrong Credentials!"})
             }
         })
       }else{
         res.status(400).json({msg:"User does not exist!!"})
       }
    } 
    catch(err){
         res.status(400).json(err);
    };
 });


module.exports = {
    userRouter
}