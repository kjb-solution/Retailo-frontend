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
  const [hoveredItem, setHoveredItem] = useState(null);

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
    {
      icon: <FaFileInvoice />,
      label: "Reports",
      path: "/reports",
      submenu: [
        { label: "Sales", path: "/reports/sales" },
        { label: "Item Sales", path: "/reports/item-wise-report" },
        { label: "NC Sales", path: "/reports/nc-sales" },
        { label: "Day Sales", path: "/reports/day-sales" },
      ],
    },
    { icon: <FaBoxes />, label: "Inventory", path: "/inventory" },
  ];

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const isSubmenuActive = (submenu) =>
    submenu?.some((sub) => location.pathname.startsWith(sub.path));

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
                  (hasSubmenu && isSubmenuActive(item.submenu)) ||
                  hoveredItem === item.label;

                return (
                  <li
                    key={index}
                    className={isActive ? "active" : ""}
                    onMouseEnter={() =>
                      hasSubmenu && setHoveredItem(item.label)
                    }
                    onMouseLeave={() => hasSubmenu && setHoveredItem(null)}
                  >
                    {hasSubmenu ? (
                      <div className="nav-link no-link">
                        <span className="icon">{item.icon}</span>
                        {isOpen && <span className="label">{item.label}</span>}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="nav-link"
                        onClick={handleNavClick}
                      >
                        <span className="icon">{item.icon}</span>
                        {isOpen && <span className="label">{item.label}</span>}
                      </Link>
                    )}

                    {hasSubmenu && hoveredItem === item.label && (
                      <div
                        className={`submenu-popup animate`}
                        style={{ left: isOpen ? "204px" : "64px" }}
                      >
                        <ul>
                          {item.submenu.map((sub, idx) => {
                            const isSubActive = location.pathname === sub.path;
                            return (
                              <li
                                key={idx}
                                className={isSubActive ? "active-submenu" : ""}
                              >
                                <Link
                                  to={sub.path}
                                  className="submenu-item"
                                  onClick={() => {
                                    handleNavClick();
                                    setHoveredItem(null);
                                  }}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
