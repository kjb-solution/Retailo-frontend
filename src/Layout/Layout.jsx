import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./Topnav";
import "./Layout.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isInitialized, setIsInitialized] = useState(false);

  // Routes that should hide the sidebar and full padding
  const hideSidebarPrefixes = ["/restaurant/billing", "/login", "/signup", "/kot", "/kot-billing-table"];

  // Check if current path starts with any of the hidden sidebar routes
  const shouldHideSidebar = hideSidebarPrefixes.some(prefix =>
    location.pathname.startsWith(prefix)
  );

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
    setSidebarOpen(prev => !prev);
  };

  if (!isInitialized) return null;

  return (
    <div className={`layout ${shouldHideSidebar ? "no-sidebar" : ""}`}>
      {isMobile && isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      {!shouldHideSidebar && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      )}

      <div
        className={`main-content ${
          !isSidebarOpen && !isMobile ? "collapsed" : ""
        }`}
      >
        <TopNav onToggleSidebar={toggleSidebar} />
        <div
          className={`content-area ${
            hideSidebarPrefixes.some(prefix =>
              location.pathname.startsWith(prefix)
            )
              ? "no-padding"
              : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
