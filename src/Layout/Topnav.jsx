import React, { useState, useEffect, useRef } from "react";
import "./Topnav.css";
import {
  FaBars,
  FaHome,
  FaBell,
  FaSearch,
  FaMailBulk,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopNav = ({ onToggleSidebar }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "John Doe",
      action: "invite you to",
      target: "Prototyping",
      time: "45 min ago",
      img: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Adam Nolan",
      action: "mentioned you to",
      target: "UX Basics",
      time: "9h ago",
      img: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Anna Morgan",
      action: "Upload a file",
      target: "",
      time: "9h ago",
      img: "https://i.pravatar.cc/40?img=3",
    },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topnav">
      <div className="left-controls">
        <button className="toggle-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <button className="dashboard-btn" onClick={handleDashboardClick}>
          <FaHome size={24} />
        </button>
        <button className="dashboard-btn" onClick={handleDashboardClick}>
          <FaMailBulk size={24} />
        </button>

        <div className="search-label-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="profile">
        <div className="notification-wrapper" ref={notificationRef}>
          <div className="notification-icon-container">
            <FaBell
              size={24}
              className="notification-icon"
              onClick={() => setShowNotification(!showNotification)}
            />
            {notifications.length > 0 && (
              <span className="notification-count notification-glow">
                {notifications.length}
              </span>
            )}
          </div>
          {showNotification && (
            <div className="notification-dropdown">
              <div className="notif-header">
                <span>Notification</span>
                <span className="notif-badge">{notifications.length}New</span>
              </div>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="notif-item"
                  onMouseEnter={() => {}}
                >
                  <img src={notif.img} alt="user" />
                  <p>
                    <strong>{notif.name}</strong> {notif.action}{" "}
                    <strong>{notif.target}</strong>
                    <br />
                    <small>{notif.time}</small>
                  </p>
                  <FaTimes
                    className="notif-close"
                    onClick={() => handleRemoveNotification(notif.id)}
                  />
                </div>
              ))}
              <button className="notif-footer">Read All Notifications</button>
            </div>
          )}
        </div>

        <div className="profile-dropdown-wrapper" ref={profileRef}>
          <img
            src="https://i.pravatar.cc/30"
            alt="profile"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            style={{ cursor: "pointer" }}
          />

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img src="https://i.pravatar.cc/60" alt="user" />
                <div>
                  <strong>ArunKumar</strong>
                  <p>Frontend Developer</p>
                </div>
              </div>
              <div className="profile-admin">
                <FaUser />
                <p>Profile</p>
              </div>
              <button className="logout-btn">
                <FaSignOutAlt style={{ marginRight: "8px" }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
