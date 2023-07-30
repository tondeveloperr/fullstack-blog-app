import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { IconLogo } from "../../../assets/icons";
import { DropDown, HamburgerMenu, WriteMenu } from "../../atoms";
import "./navbar.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={IconLogo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?category=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?category=health ">
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

          <WriteMenu />

          {currentUser ? (
            <DropDown />
          ) : (
            <Link className="login" to="/login">
              Login
            </Link>
          )}
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
