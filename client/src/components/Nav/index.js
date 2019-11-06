import React from "react";
import { Link } from "react-router-dom";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <Link className="navbar-brand" to="/">
        React Google Book Search
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/search"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/saved"
              className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
            >
              Saved
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
