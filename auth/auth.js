const mongoose = require("mongoose");
const express = require("express")
const User = require("../models/user");
const router = express.Router();
// const userLogin = require("../middleware/middleware")
const bcrypt = require("bcrypt");
const {userLogin} = require("../middleware/middleware")
const jwt = require("jsonwebtoken")

router.get("/homes",(req,res)=>{
    res.send("okk")
})
router.post("/register",async(req,res)=>{
    console.log(req.body)
    try{
       const {userName,password,confirmPassword} = req.body;
       console.log(userName,password,confirmPassword)
       if(!userName || !password || !confirmPassword){
        return res.status(401).json({
            error:"please enter all fields"
            })
       }
        if(password != confirmPassword){
           return res.status(401).json({
            error:"password & confirmPassword must be same"
            })
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(401).json({
                error:"user already exits"
                })
        }
        bcrypt.hash(password, 10, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                return res.json({error:err})
            }
            const new_user = await User.create({
                userName,
                password :hash
            })
            res.json({
                message:"user successfully registered"
            })
        });
    }catch(err){
         res.status(401).json({
            error:err.message
            })
    }
})
router.post("/login",async(req,res)=>{
    console.log(req.body)
    try{
       const {userName,password} = req.body;
       console.log(userName,password)
       if(!userName || !password){
        return res.status(401).json({
            error:"please enter all fields"
            })
       }
       
        const user = await User.findOne({userName});
        if(!user){
            return res.status(401).json({
                error:"user not exist"
                })
        }
        // console.log(user)
        const result = await bcrypt.compare(password, user.password)
        if(!result){
            return res.json({
                error:"invalid credentials"
            })
        }
         const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        // const token = await jwt.sign({
        //     data: 'foobar'
        //   }, 'secret', { expiresIn: 60 * 60 });
                res.json({
                    message:"user successfully login",
                    user,
                    token
                }) 
    }catch(err){
         res.status(401).json({
            error:err.message
            })
    }
})




module.exports = router;