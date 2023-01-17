import { BrowserRouter, Routes,Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
const Router =()=>{
    return(
        <>
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
        </>
    )
}
export default Router;