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
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/" },
    { icon: <FaShoppingCart />, label: "Orders", path: "/orders" },
    { icon: <FaComments />, label: "Messages", path: "/messages" },
    { icon: <FaCalendarAlt />, label: "Calendar", path: "/calendar" },
    { icon: <FaUtensils />, label: "Menu", path: "/menu" },
    { icon: <FaBoxes />, label: "Inventory", path: "/inventory" },
    { icon: <FaStar />, label: "Reviews", path: "/reviews" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-content">
        <div className="logo">{isOpen ? "Retail" : "R"}</div>

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
