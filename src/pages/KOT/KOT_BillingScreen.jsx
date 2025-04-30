import { useState, useEffect, useCallback } from "react";
import "../Billing/Billing.css";
import { menuData } from "../../services/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Invoice from "./KOT_BillingScreenComponents/Invoice.jsx";
import Cart from "./KOT_BillingScreenComponents/cart.jsx";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product_Quantity_Model from "./KOT_BillingScreenComponents/Product_Quantity_Model.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function KOT_BillingScreen() {
  const navigate = useNavigate();
  const tableNumber = useParams().tableNumber;
  const [menu, setMenu] = useState(menuData);
  const [selectedCategory, setSelectedCategory] = useState(
    menuData[0].category
  );
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [activeNav, setActiveNav] = useState("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile] = useState(window.innerWidth <= 768);
  const [kOTBillingProducts, setKotBillingProducts] = useState([]);
  // Kot order Creation
  const handleKOTCreate = () => {
    const updatedKOT = [...kOTBillingProducts];

    products.forEach((product) => {
      const existingIndex = updatedKOT.findIndex((p) => p.id === product.id);
      if (existingIndex > -1) {
        // If product already exists, update quantity and price
        updatedKOT[existingIndex].quantity += product.quantity;
      } else {
        updatedKOT.push({ ...product });
      }
      // navigate("/kot")
    });

    setKotBillingProducts(updatedKOT);
    toast.success("KOT Created");
    setProducts([]); // Clear temporary products
  };

  const clearCart = () => {
    setProducts([]);
    setSubtotal(0);
    setTax(0);
    setTotal(0);
  };

  const handleAddProduct = (product) => {
    toast.dismiss();
    const existingProduct = products.find((p) => p.id === product.id);
    if (existingProduct) {
      setProducts(
        products.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + (product.quantity || 1) }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        { ...product, quantity: product.quantity || 1 },
      ]);
    }

    toast.success(`${product.name} Added`);
  };

  const updateQuantity = (productId, change) => {
    console.log(productId, change);
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
    console.log("delete product", productId);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const kOTUpdateQuantity = (productId, change) => {
    setKotBillingProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + change }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  const kOTDeleteProduct = (productId) => {
    setKotBillingProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  useEffect(() => {
    const newSubtotal = kOTBillingProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const newTax = newSubtotal * 0.05;
    const newTotal = newSubtotal + newTax;
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [kOTBillingProducts]);

  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);
  const kotTotalItems = kOTBillingProducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  console.log("totalItems", totalItems);
  console.log("kotTotalItems", kotTotalItems);

  const filteredProducts = selectedCategory
    ? menu
        .find((item) => item.category === selectedCategory)
        ?.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  useEffect(() => {
    console.log("kOTBillingProducts", kOTBillingProducts);
    console.log("products", products);
  }, [kOTBillingProducts, products]);

  return (
    <div id="billing-container">
      <div className="mobile-nav-container element-only-sm">
        <div
          onClick={() => setActiveNav("category")}
          style={{
            ...(activeNav === "category" ? { backgroundColor: "#dc1e5c" } : {}),
          }}
          id="mobile-cart-container"
          className={`header-bar ${activeNav === "category" ? "active" : ""}`}
        >
          <span>Category</span>
        </div>
        <div
          style={{
            borderRight: "1px solid #ccc",
            borderLeft: "1px solid #ccc",
            ...(activeNav === "menu" ? { backgroundColor: "#dc1e5c" } : {}),
          }}
          onClick={() => setActiveNav("menu")}
          className={`header-bar menu-header-wrapper ${
            activeNav === "menu" ? "active" : ""
          }`}
        >
          <span>Menu</span>
        </div>
        <div
          style={activeNav === "invoice" ? { backgroundColor: "#dc1e5c" } : {}}
          onClick={() => setActiveNav("invoice")}
          className={`header-bar billing-header ${
            activeNav === "invoice" ? "active" : ""
          }`}
        >
          <Cart totalItems={kotTotalItems} />
        </div>
      </div>
      <div
      className="element-only-sm"
        style={{
          fontSize: "19px",
          fontWeight: "600",
          color: "rgb(107 255 225)",
          padding: "0px 5px",
          borderBottom: "0.5px solid white",
          borderTop: "0.5px solid white",
          textAlign: "center",
          backgroundColor: "var(--theme-bg-color)",
        }}
      >
        Table No : {tableNumber}
      </div>
      <div className="element-only-sm">
        {activeNav === "category" && (
          <div id="billing-left-container">
            <div
              id="mobile-cart-container"
              className="header-bar element-only-lg"
            >
              <span>Category</span>
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
            <h1 style={{ marginLeft: "5px" }}>{selectedCategory}</h1>
            <div className="menu-header-wrapper">
              <div className="search-container1">
                <FontAwesomeIcon icon={faSearch} className="search-icon1" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div id="product-container" style={{ marginTop: "5px" }}>
              {filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => {
                    setIsModelOpen(true);
                    setSelectedProduct(product);
                  }}
                >
                  <span className="">{product.name}</span>
                  {/* {products.find((p) => p.id === product.id)?.quantity > 0 && (
                    <span className="product-quantity">
                      X{products.find((p) => p.id === product.id)?.quantity}
                    </span>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === "invoice" && (
          <div id="billing-right-container" className="">
            <Invoice
              KOT_items={products}
              handleKOTCreate={handleKOTCreate}
              kOTBillingProducts={kOTBillingProducts}
              kOTUpdateQuantity={kOTUpdateQuantity}
              kOTDeleteProduct={kOTDeleteProduct}
              subtotal={subtotal}
              tax={tax}
              total={total}
              updateQuantity={updateQuantity}
              deleteProduct={deleteProduct}
              totalItems={totalItems}
              kotTotalItems={kotTotalItems}
              onClearCart={clearCart}
            />
          </div>
        )}

        <div id="billing-right-container" className="element-only-lg">
          <div className="header-bar billing-header">
            <span>Billing</span>
            <Cart totalItems={kotTotalItems} />
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
      <div className="element-only-lg">
        <div id="billing-left-container">
          <div
            id="mobile-cart-container"
            className="header-bar element-only-lg"
            style={{ backgroundColor: "#1e4a64" }}
          >
            <span className="header-lg header-new-lg">Category</span>
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
          <div
            className="header-bar menu-header-wrapper menu-header-unique"
            // style={{ backgroundColor: "#1e4a64" }}
          >
            <span className="header-lg header-new-lg">Menu</span>
            <span
              style={{
                fontSize: "19px",
                fontWeight: "600",
                color: "rgb(107 255 225)",
                padding: "0px 5px",
                borderBottom: "1px solid white",
                borderRadius: "5px",
              }}
            >
              Table No : {tableNumber}
            </span>
          </div>
          <div className="search-container1">
            <FontAwesomeIcon icon={faSearch} className="search-icon1" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div id="product-container">
            {filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => handleAddProduct(product)}
              >
                <span className="">{product.name}</span>
                {/* {products.find((p) => p.id === product.id)?.quantity > 0 && (
                  <span className="product-quantity element-only-sm">
                    X{products.find((p) => p.id === product.id)?.quantity}
                  </span>
                )} */}
              </div>
            ))}
          </div>
        </div>

        <div id="billing-right-container" className="">
          <div className={`header-bar billing-header `}>
            {" "}
            <span className="header-lg">Billing</span>
            <Cart totalItems={kotTotalItems} />
          </div>
          <Invoice
            KOT_items={products}
            handleKOTCreate={handleKOTCreate}
            kOTBillingProducts={kOTBillingProducts}
            kOTUpdateQuantity={kOTUpdateQuantity}
            kOTDeleteProduct={kOTDeleteProduct}
            subtotal={subtotal}
            tax={tax}
            total={total}
            updateQuantity={updateQuantity}
            deleteProduct={deleteProduct}
            totalItems={totalItems}
            kotTotalItems={kotTotalItems}
            onClearCart={clearCart}
          />
        </div>
      </div>
      {isModelOpen && selectedProduct && (
        <Product_Quantity_Model
          product={selectedProduct}
          setIsModelOpen={setIsModelOpen}
          handleAddProduct={handleAddProduct}
        />
      )}
      <ToastContainer
        position={isMobile ? "bottom-center" : "top-center"}
        style={{
          fontSize: "19px",
        }}
        autoClose={400}
        transition={Slide}
        hideProgressBar={true}
        theme="light"
        limit={1}
        closeButton={false}
        delay={0}
      />{" "}
    </div>
  );
}
export default KOT_BillingScreen;
