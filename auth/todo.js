const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const {userLogin} = require("../middleware/middleware")
router.post("/post",userLogin,async(req,res)=>{
    const {activity} = req.body;
    if(!activity){
        return res.json({
            error:"activity cannot be empty"
        })
    }
    const post = await Post.create({
        activity,
    status:"pending",
    timeTaken:""
    })
    res.json({
        status:"succusfully posted",
        post
    })
})
module.exports = router;