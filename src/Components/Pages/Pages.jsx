import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";



const Pages = () => {
    return (
    <div>
        <Routes>
            <Route path="/" element= {<Home></Home>} ></Route>
            <Route path="/login" element= {<Login></Login>} ></Route>
            <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
    </div>
    );
};
export default Pages;