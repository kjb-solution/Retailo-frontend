import React from 'react';
import './Topnav.css';
import { FaBars } from 'react-icons/fa';

const TopNav = ({ onToggleSidebar }) => {
  return (
    <div className="topnav">
      <button className="toggle-btn" onClick={onToggleSidebar}>
        <FaBars />
      </button>
      <div className="profile">
        <span>Orlando Laurentius</span>
        <img src="https://i.pravatar.cc/30" alt="profile" />
      </div>
    </div>
  );
};

export default TopNav;
