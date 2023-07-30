import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { IconWrite, IconWriteActive } from "../../../assets/icons";
import "../../molecules/navbar/navbar.scss";

const WriteMenu = () => {
  const { currentUser } = useContext(AuthContext);
  const [isWriteIconHovered, setIsWriteIconHovered] = useState(false);
  const navigate = useNavigate();

  const handleWriteIconHover = (isHovered) => {
    setIsWriteIconHovered(isHovered);
  };

  const handleWriteClick = () => {
    if (currentUser) {
      navigate("/write");
    } else {
      navigate("/login");
    }
  };
  return (
    <span
      className="write"
      onMouseEnter={() => handleWriteIconHover(true)}
      onMouseLeave={() => handleWriteIconHover(false)}
    >
      <img
        src={isWriteIconHovered ? IconWriteActive : IconWrite}
        alt="Icon-write"
        onClick={handleWriteClick}
      />
    </span>
  );
};

export default WriteMenu;
