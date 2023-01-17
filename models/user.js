const mongoose = require("mongoose");
const express = require("express")

const userSchema = new mongoose.Schema({
    userName : {type:String,required:true},
    password: {type:String}
})

const user = mongoose.model("User",userSchema);
module.exports = user;