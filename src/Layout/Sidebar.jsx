import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaComments,
  FaCalendarAlt,
  FaUtensils,
  FaBoxes,
  FaStar,
  FaFileInvoice,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [showSubmenu, setShowSubmenu] = useState(false);

  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/" },
    {
      icon: <FaCalendarAlt />,
      label: "Restaurant",
      path: "/restaurant",
      submenu: [
        { label: "KOT", path: "/restaurant/Kot" },
        { label: "BILL", path: "/restaurant/bill" },
        { label: "View Sales", path: "/restaurant/view-sales" },
        { label: "Table Transfer", path: "/restaurant/table-transfer" },
        { label: "KOT Transfer", path: "/restaurant/kot-transfer" },
      ],
    },
    { icon: <FaShoppingCart />, label: "Master", path: "/master" },
    { icon: <FaFileInvoice />, label: "Billing", path: "/billing" },
    // { icon: <FaUtensils />, label: "Menu", path: "/menu" },
    { icon: <FaBoxes />, label: "Inventory", path: "/inventory" },
    // { icon: <FaStar />, label: "Reviews", path: "/reviews" },
  ];

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const toggleSubmenu = (item) => {
    if (item.label === "Restaurant") {
      setShowSubmenu(!showSubmenu);
    } else {
      setShowSubmenu(false);
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-content">
          <div className="logo">
            <img src={Logo} alt="Logo" className="logo-icon" />
            {isOpen && <span className="logo-text">Retail</span>}
          </div>

          <div
            className={`sidebar-profile ${isOpen ? "expanded" : "collapsed"}`}
          >
            <img
              src="https://i.pravatar.cc/30"
              alt="profile"
              className="sidebar-profile-img"
            />
            {isOpen && (
              <span className="sidebar-profile-name">Orlando Laurentius</span>
            )}
          </div>

          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => {
                  toggleSubmenu(item);
                  handleNavClick();
                }}
              >
                <Link to={item.path} className="nav-link">
                  <span className="icon">{item.icon}</span>
                  {isOpen && <span className="label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showSubmenu && (
        <div
          className={`submenu-popup animate`}
          style={{ left: isOpen ? "224px" : "64px" }}
        >
          <ul>
            {navItems
              .find((item) => item.label === "Restaurant")
              .submenu.map((sub, idx) => (
                <li key={idx}>
                  <Link to={sub.path} className="submenu-item">
                    {sub.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
