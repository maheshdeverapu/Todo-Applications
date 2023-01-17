import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signup.css"
const Signup = ()=>{
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate();
const signupHandle=(e)=>{
    e.preventDefault();
    console.log(userName,password,confirmPassword);
    if(!userName || !password || !confirmPassword){
        alert("please fill all fields");
        return;
    }
    fetch("/register",{
        method :"post",
        headers:{"content-type" : "application/json"},
            body:JSON.stringify({
                userName,
                password,
                confirmPassword
            })}).then(res=>res.json()).then(data=>{
                console.log(data)
                if(data.error){
                    alert(data.error)
                    return;
                }
                alert(data.message)
                navigate("/login")
            }).catch(error=>{
                console.log(error)
            })
        }
    return(
        <div className="signup_container">
        <form className="signup_form">
        <h3 className="signup_header">Signup</h3>
            <input className="signup userName" onChange={(e)=>{setUserName(e.target.value)}} type={"gmail"} placeholder="userName"/>
            <input className="signup password" onChange={(e)=>{setPassword(e.target.value)}} type={"password"} placeholder="password"/>
            <input className="signup confirmpassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} type={"password"} placeholder="confirm password"/>
            <button className="signup button" onClick={signupHandle}>signup</button>
            {`already registered? click on Login`}<Link to={"/login"}>Login</Link>
            
        </form>
        </div>
    )
}
export default Signup;