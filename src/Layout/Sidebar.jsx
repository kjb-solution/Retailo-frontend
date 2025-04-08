import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaShoppingCart, FaComments, FaCalendarAlt, FaUtensils, FaBoxes, FaStar } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard' },
    { icon: <FaShoppingCart />, label: 'Orders' },
    { icon: <FaComments />, label: 'Messages' },
    { icon: <FaCalendarAlt />, label: 'Calendar' },
    { icon: <FaUtensils />, label: 'Menu' },
    { icon: <FaBoxes />, label: 'Inventory' },
    { icon: <FaStar />, label: 'Reviews' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="logo">{isOpen ? 'Reztro' : 'R'}</div>
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index}>
            <span className="icon">{item.icon}</span>
            {isOpen && <span className="label">{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
