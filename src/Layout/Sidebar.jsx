import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaCalendarAlt,
  FaBoxes,
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
        { label: "KOT", path: "/restaurant/kot" },
        { label: "BILL", path: "/restaurant/billing" },
        { label: "View Sales", path: "/restaurant/res-sales" },
        { label: "Table Transfer", path: "/restaurant/table-transfer" },
        { label: "KOT Transfer", path: "/restaurant/kot-transfer" },
      ],
    },
    { icon: <FaShoppingCart />, label: "Master", path: "/master" },
    { icon: <FaFileInvoice />, label: "Billing", path: "/billing" },
    { icon: <FaBoxes />, label: "Inventory", path: "/inventory" },
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

  const handleSubmenuClick = () => {
    setShowSubmenu(false);
    handleNavClick();
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div>
          <div className="logo">
            <img src={Logo} alt="Logo" className="logo-icon" />
            {isOpen && <span className="logo-text">Retail</span>}
          </div>
          <div className="sidebar-content">
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
              {navItems.map((item, index) => {
                const hasSubmenu = !!item.submenu;
                const isActive =
                  location.pathname === item.path ||
                  (hasSubmenu &&
                    item.submenu.some((sub) =>
                      location.pathname.startsWith(sub.path)
                    ));

                return (
                  <li
                    key={index}
                    className={isActive ? "active" : ""}
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleSubmenu(item);
                      } else {
                        handleNavClick();
                      }
                    }}
                  >
                    {hasSubmenu ? (
                      <div className="nav-link no-link">
                        <span className="icon">{item.icon}</span>
                        {isOpen && <span className="label">{item.label}</span>}
                      </div>
                    ) : (
                      <Link to={item.path} className="nav-link">
                        <span className="icon">{item.icon}</span>
                        {isOpen && <span className="label">{item.label}</span>}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {showSubmenu && (
        <div
          className={`submenu-popup animate`}
          style={{ left: isOpen ? "204px" : "64px" }}
        >
          <ul>
            {navItems
              .find((item) => item.label === "Restaurant")
              .submenu.map((sub, idx) => {
                const isSubActive = location.pathname === sub.path;
                return (
                  <li key={idx} className={isSubActive ? "active-submenu" : ""}>
                    <Link
                      to={sub.path}
                      className="submenu-item"
                      onClick={handleSubmenuClick}
                    >
                      {sub.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
