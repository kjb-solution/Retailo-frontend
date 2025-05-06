import React from "react";
import { Link } from "react-router-dom";
import "./HeaderNavLinks.css";

function HeaderNavLinks({ data }) {
  return (
    <div className="kot-header-links">
      {data.map((link, index) => (
        <>
          <div  className="kot-header-link">
            <Link to={link.link}>
              <span>{link.name}</span>
            </Link>
          </div>
          {index < data.length - 1 && (
            <span className="" style={{ color: "#3d51d8" }}>
              /
            </span>
          )}
        </>
      ))}
    </div>
  );
}

export default HeaderNavLinks;
