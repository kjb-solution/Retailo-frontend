import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./Topnav";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
      setIsInitialized(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  if (!isInitialized) return null;

  return (
    <div className="layout">
      {isMobile && isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={`main-content ${
          !isSidebarOpen && !isMobile ? "collapsed" : ""
        }`}
      >
        <TopNav onToggleSidebar={toggleSidebar} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
