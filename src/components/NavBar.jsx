import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const routes = [
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

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function onScroll() {
    const scrolled = document.documentElement.scrollTop >= 56;
    setScrolled(scrolled);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const navbarStyle = {
    // background: scrolled ? "rgba(0, 0, 0)" : "transparent",
    background: scrolled || isMobileNavOpen ? "black" : "transparent", // Change background color when scrolled or mobile nav is open
    color: "white",
    fontWeight: "600",
    zIndex: "10",
    boxShadow: "5px 10px transparent",
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
  };
  return (
    <Navbar
      expand="sm"
      fixed="top"
      style={navbarStyle}
      variant="dark"
      onToggle={(expanded) => setIsMobileNavOpen(expanded)}
    >
      <div className="container-md pt-1 pb-1 mobileContainer">
        <Navbar.Brand>
          <Link
            to="/"
            style={linkStyle}
            className="text-info fs-4"
            onClick={() => setIsMobileNavOpen(false)}
          >
            MoviesNow
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav "
          className={`mobileCollapse ${isMobileNavOpen ? "d-block" : "d-none"}`}
        >
          <Nav className="navStyle">
            {routes.map((route, idx) => {
              return (
                <Link
                  key={idx}
                  to={route.path}
                  style={linkStyle}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {route.name}
                </Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
