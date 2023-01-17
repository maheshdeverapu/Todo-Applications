import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";
const Login = ()=>{
    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const loginhandler =(e)=>{
        e.preventDefault();
        if(!userName || !password){
            return alert("please enter all fields")
        }
        fetch("/login",{
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                userName,
                password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){
                return alert(data.error)
            }
            alert(data.message);
            navigate("/home")
        })
    }
    return (
        <div className="login_container">
        <form className="login_form">
        <h1 className="header">Login</h1>
            <input className="login userName" onChange={(e)=>{setUserName(e.target.value)}} type={"text"} placeholder={"userName"}/>
            <input className="login password" onChange={(e)=>{setPassword(e.target.value)}} type={"text"} placeholder={"password"}/>
            <button className="login button" onClick={loginhandler}>login</button>
            {`don't have an account? click on signup to register`}<Link to={"/"}>Signup</Link>
        </form>
        </div>
    )
}
export default Login;