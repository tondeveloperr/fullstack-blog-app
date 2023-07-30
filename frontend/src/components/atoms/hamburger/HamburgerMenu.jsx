import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./hamburgermenu.scss";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleMenuToggle = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMenuToggle);

    return () => {
      document.removeEventListener("mousedown", handleMenuToggle);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      ref={dropdownRef}
      className={`hamburger-menu ${isMenuOpen ? "is-open" : ""}`}
    >
      <div className="hamburger-button" onClick={handleMenuToggle}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <div className={`menu-items ${isMenuOpen ? "is-active" : ""}`}>
        <div className="content">
          <Link className="link" to="/?category=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?category=health">
            <h6>HEALTH</h6>
          </Link>
          <Link className="link" to="/?category=travel">
            <h6>TRAVEL</h6>
          </Link>
          <Link className="link" to="/?category=fashion">
            <h6>FASHION</h6>
          </Link>
          <Link className="link" to="/?category=arts">
            <h6>ARTS</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
