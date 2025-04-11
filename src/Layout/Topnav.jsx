import React, { useState, useEffect, useRef } from "react";
import "./Topnav.css";
import { FaBars, FaHome, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopNav = ({ onToggleSidebar }) => {
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topnav">
      <div className="left-controls" style={{ display: "flex" }}>
        <button className="toggle-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <button className="dashboard-btn" onClick={handleDashboardClick}>
          <FaHome size={24} />
        </button>
      </div>

      <div className="profile">
        <div className="notification-wrapper" ref={notificationRef}>
          <FaBell
            size={24}
            className="notification-icon"
            onClick={() => setShowNotification(!showNotification)}
          />
          {showNotification && (
            <div className="notification-dropdown">
              <div className="notif-header">
                <span>Notification</span>
                <span className="notif-badge">3New</span>
              </div>
              <div className="notif-item">
                <img src="https://i.pravatar.cc/40?img=1" alt="user" />
                <p>
                  <strong>John Doe</strong> invite you to{" "}
                  <strong>Prototyping</strong>
                  <br />
                  <small>45 min ago</small>
                </p>
              </div>
              <div className="notif-item">
                <img src="https://i.pravatar.cc/40?img=2" alt="user" />
                <p>
                  <strong>Adam Nolan</strong> mentioned you to{" "}
                  <strong>UX Basics</strong>
                  <br />
                  <small>9h Ago</small>
                </p>
              </div>
              <div className="notif-item">
                <img src="https://i.pravatar.cc/40?img=3" alt="user" />
                <p>
                  <strong>Anna Morgan</strong> Upload a file
                  <br />
                  <small>9h Ago</small>
                </p>
              </div>
              <button className="notif-footer">Read All Notifications</button>
            </div>
          )}
        </div>

        <img src="https://i.pravatar.cc/30" alt="profile" />
      </div>
    </div>
  );
};

export default TopNav;
