import React from "react";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaComments,
  FaCalendarAlt,
  FaUtensils,
  FaBoxes,
  FaStar,
  FaFileInvoice
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/" },
    { icon: <FaShoppingCart />, label: "Master", path: "/master" },
    { icon: <FaFileInvoice />, label: "Billing", path: "/billing" },
    { icon: <FaCalendarAlt />, label: "Calendar", path: "/calendar" },
    { icon: <FaUtensils />, label: "Menu", path: "/menu" },
    { icon: <FaBoxes />, label: "Inventory", path: "/inventory" },
    { icon: <FaStar />, label: "Reviews", path: "/reviews" },
  ];

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-content">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-icon" />
          {isOpen && <span className="logo-text">Retail</span>}
        </div>

        <div className={`sidebar-profile ${isOpen ? "expanded" : "collapsed"}`}>
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
              onClick={handleNavClick}
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
  );
};

export default Sidebar;
