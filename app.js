const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}
const port = 5000;
// const db = process.env.MONGODB;
// console.log(db);
// const connectDatabase = async()=>{
//     console.log(1);
//     try {
//         await mongoose.connect(db);
//         console.log('MongoDB is Connected...')
//     } catch (err) {
//         console.error(err.message);
//         console.log('Check Your ENV VAR')
//         process.exit(1)
//     }
// }

mongoose.connect("mongodb+srv://todo-app:rFv9VnrUtSWlcoDt@cluster0.9dgwcnp.mongodb.net/?retryWrites=true&w=majority",  
//process.env.MONGODB,
    {useNewUrlParser:true,
        useUnifiedTopology:true
    })
    // mongoose.set('strictQuery', false)
    mongoose.connection.on('connected',()=>{
        console.log("connected to database wohoo!")
    })
    mongoose.connection.on('err',(err)=>{
        console.log("error occured", err)
    })
app.use(express.json())
// app.get("/",(req,res)=>{
//     res.send("ok")
// })
if (process.env.NODE_ENV === "production") {
    //*Set static folder up in production
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
  }
app.use(require("./auth/auth"));
app.use(require("./auth/todo"))
app.listen(port,()=>{console.log(`server is up at port number ${port}`)})