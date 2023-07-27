import { Link } from "react-router-dom";
import { IconLogo } from "../../assets/icons/page";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.scss";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

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
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
