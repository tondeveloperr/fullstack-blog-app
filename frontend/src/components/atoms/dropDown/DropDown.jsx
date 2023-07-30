import { useRef, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { IconAvatarDefault } from "../../../assets/icons";
import "./dropdown.scss";
import { Link, useNavigate } from "react-router-dom";

const DropDown = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownActive((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isDropdownActive ? "is-active is-hovered" : ""}`}
    >
      <div className="dropdown-trigger">
        {currentUser?.image ? (
          <img
            src={`../upload/${currentUser?.image}`}
            alt="user"
            className="profile"
            onClick={handleDropdownClick}
          />
        ) : (
          <img
            src={IconAvatarDefault}
            alt="user"
            className="profile"
            onClick={handleDropdownClick}
          />
        )}
      </div>
      <div className={`dropdown-menu ${isDropdownActive ? "is-active" : ""}`}>
        <div className="dropdown-content">
          <Link className="item" to={`/${currentUser?.username}`}>
            {currentUser?.username}
          </Link>
          <span className="item" onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
