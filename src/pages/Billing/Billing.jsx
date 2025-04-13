import { useState, useEffect } from "react";
import "./Billing.css";
import { menuData } from "../../services/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faMinimize,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Invoice from "./Invoice.jsx";
import Cart from "./cart.jsx";
import { useNavigate, Routes, Route } from "react-router-dom";

function Billing() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [menu, setMenu] = useState(menuData);
  const [selectedCategory, setSelectedCategory] = useState(
    menuData[0].category
  );
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeNav, setActiveNav] = useState("category");
  const [searchTerm, setSearchTerm] = useState("");

  const clearCart = () => {
    setProducts([]);
    setSubtotal(0);
    setTax(0);
    setTotal(0);
  };

  const handleAddProduct = (product) => {
    const existingProduct = products.find((p) => p.id === product.id);
    if (existingProduct) {
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setProducts([...products, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + change }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  useEffect(() => {
    const newSubtotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const newTax = newSubtotal * 0.05;
    const newTotal = newSubtotal + newTax;
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [products]);

  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = selectedCategory
    ? menu
        .find((item) => item.category === selectedCategory)
        ?.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  return (
    <div id="billing-container">
      <div className="mobile-nav-container element-only-sm">
        <div
          onClick={() => setActiveNav("category")}
          style={
            activeNav === "category"
              ? { backgroundColor: "red" }
              : {}
          }
          id="mobile-cart-container"
          className={`header-bar ${activeNav === "category" ? "active" : ""}`}
        >
          <p>Category</p>
        </div>
        <div
         style={
          activeNav === "menu"
            ? { backgroundColor: "red" }
            : {}
        }
          onClick={() => setActiveNav("menu")}
          className={`header-bar menu-header-wrapper ${
            activeNav === "menu" ? "active" : ""
          }`}
        >
          <p>Menu</p>
        </div>
        <div
         style={
          activeNav === "invoice"
            ? { backgroundColor: "red" }
            : {}
        }
          onClick={() => setActiveNav("invoice")}
          className={`header-bar billing-header ${
            activeNav === "invoice" ? "active" : ""
          }`}
        >
          <Cart totalItems={totalItems} />
        </div>
      </div>
      <div className="element-only-sm">
        {activeNav === "category" && (
          <div id="billing-left-container">
            <div
              id="mobile-cart-container"
              className="header-bar element-only-lg"
            >
              <p>Category</p>
            </div>
            <div className="menu-category-container">
              {menu.map((item, index) => (
                <div
                  key={index}
                  className={`menu-card ${
                    selectedCategory === item.category ? "active-menu" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(item.category);
                    setActiveNav("menu");
                  }}
                >
                  <p className="menu-card-header">{item.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === "menu" && (
          <div id="menu-display-area">
            <h1>{selectedCategory}</h1>
            <div className="header-bar menu-header-wrapper">
              <p className="element-only-lg">Menu</p>
              
              <div className="search-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
             
            </div>
            <div id="product-container">
              {filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => handleAddProduct(product)}
                >
                  <h4 className="">{product.name}</h4>
                  {products.find((p) => p.id === product.id)?.quantity > 0 && (
                    <span className="product-quantity">
                      X{products.find((p) => p.id === product.id)?.quantity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === "invoice" && (
          <div id="billing-right-container" className="">
            <Invoice
              items={products}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onUpdateQty={updateQuantity}
              onDelete={deleteProduct}
              totalItems={totalItems}
              onClearCart={clearCart}
            />
          </div>
        )}

        <div id="billing-right-container" className="element-only-lg">
          <div className="header-bar billing-header">
            <p>Billing</p>
            <Cart totalItems={totalItems} />
          </div>
          <Invoice
            items={products}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onUpdateQty={updateQuantity}
            onDelete={deleteProduct}
            totalItems={totalItems}
            onClearCart={clearCart}
          />
        </div>
      </div>
      <div className="element-only-lg" >
        <div id="billing-left-container">
          <div
            id="mobile-cart-container"
            className="header-bar element-only-lg"
          >
            <p>Category</p>
          </div>
          <div className="menu-category-container">
            {menu.map((item, index) => (
              <div
                key={index}
                className={`menu-card ${
                  selectedCategory === item.category ? "active-menu" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(item.category);
                  setActiveNav("menu");
                }}
              >
                <p className="menu-card-header">{item.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="menu-display-area">
          <div className="header-bar menu-header-wrapper">
            <p className="element-only-lg">Menu</p>
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div
              className="element-only-sm"
              onClick={() => setActiveNav("invoice")}
            >
              <Cart totalItems={totalItems} />
            </div>
          </div>
          <div id="product-container">
            {filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => handleAddProduct(product)}
              >
                <h4 className="">{product.name}</h4>
                {products.find((p) => p.id === product.id)?.quantity > 0 && (
                  <span className="product-quantity">
                    X{products.find((p) => p.id === product.id)?.quantity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="billing-right-container" className="">
        <div
         
          className={`header-bar billing-header`}
        > <p>Billing</p>
          <Cart totalItems={totalItems} />
        </div>
          <Invoice
            items={products}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onUpdateQty={updateQuantity}
            onDelete={deleteProduct}
            totalItems={totalItems}
            onClearCart={clearCart}
          />
        </div>

      
      </div>
    </div>
  );
}

export default Billing;
