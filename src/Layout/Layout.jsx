import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./Topnav";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(true); 
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      {isMobile && isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${!isSidebarOpen && !isMobile ? "collapsed" : ""}`}>
        <TopNav onToggleSidebar={toggleSidebar} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
