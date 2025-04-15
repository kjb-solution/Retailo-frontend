import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ totalItems }) => {
  return (
    <div className="cart-container">
      <span >Cart</span>
      <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
      <span className="cart-quantity">{totalItems}</span>
    </div>
  );
};

export default Cart;
