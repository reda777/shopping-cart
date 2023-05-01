import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";
function Nav(props){
    const [showCart,setShowCart]=useState(false);
    return (
        <nav>
            <ul className="nav-bar">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/shop">
                    <li>Shop</li>
                </Link>
            </ul>
            <div className="toggleCart" onClick={()=>{setShowCart((showCart)?false:true)}}>Cart</div>
            {(showCart)?<Cart cart={props.cart} setCart={props.setCart} />:null}
        </nav>
    );
}
export default Nav;