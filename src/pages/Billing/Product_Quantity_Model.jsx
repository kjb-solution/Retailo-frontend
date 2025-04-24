import React, { useEffect, useState } from "react";
import "./Product_Quantity_Model.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Product_Quantity_Model({ product, setIsModelOpen,handleAddProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState({});

 console.log();
 

  const onIncrease = () => {
    setQuantity(quantity + 1);
  };

  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleModelClick = (e) => {
    if (e.target.id === "product_quantity_layout") {
      setIsModelOpen(false);
    }
  };

  const addProduct = (product) => {
    const productData = {
        ...product,
        quantity,
        total: product.price * quantity,
      };
      handleAddProduct(productData);
      setIsModelOpen(false);
  };

  return (
    <div id="product_quantity_layout" onClick={handleModelClick}>
      <div className="product_quantity_modelCard">
        <h2>{product.name}</h2>
        <div className="quantity-controller">
          <FontAwesomeIcon
            icon={faMinus}
            className="quantity-icons-menu-sm"
            onClick={onDecrease}
          />
         <span> {quantity}</span>
          <FontAwesomeIcon
            icon={faPlus}
            className="quantity-icons-menu-sm"
            onClick={onIncrease}
          />
        </div>
          <div>
            <button className="addProductBtn" onClick={() => addProduct(product)}>ADD </button>
          </div>
      </div>
    </div>
  );
}

export default Product_Quantity_Model;
