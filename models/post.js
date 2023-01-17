const mongoose = require("mongoose");
const express = require("express")

const postSchema = new mongoose.Schema({
    activity : {type:String,required:true},
    status: {type:String},
    timeTaken: {type:String},
    action: {type:String}
})

const post = mongoose.model("Post",postSchema);

module.exports = post;