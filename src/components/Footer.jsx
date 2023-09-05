import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Movies",
    path: "/movie",
  },
  {
    name: "Tv Series",
    path: "/tv",
  },
  {
    name: "Search",
    path: "/search",
  },
];

function Footer() {
  return (
    <nav className="footer bg-transparent text-white d-flex  align-items-sm-center flex-sm-column flex-md-row justify-content-md-between p-4">
      <div className="order-md-1">
        <Link
          to="/"
          className="text-info text-decoration-none fw-semibold fs-4"
        >
          MoviesNow
        </Link>
      </div>
      <div className="order-sm-3 order-md-2">
        <p className="text-secondary ">
          @ 2023 Developed by <b className="text-info">Abdul Mohsin</b>
        </p>
      </div>
      <div className="d-fex order-md-3">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="text-decoration-none text-white px-2 "
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Footer;
