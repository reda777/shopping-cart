import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import Nav from "./Nav";
import Checkout from "./Checkout";
import { useState } from "react";
function RouteSwitch(){
    const [cart,setCart]=useState([]);
    return (
        <BrowserRouter>
        <Nav cart={cart} setCart={setCart}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop cart={cart} setCart={setCart}/>} />
                <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default RouteSwitch;