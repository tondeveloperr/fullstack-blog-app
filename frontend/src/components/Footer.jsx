import { IconLogo } from "../assets/icons/page";

const Footer = () => {
  return (
    <footer>
      <img src={IconLogo} alt="logo" />
      <span>
        Made with <b>React.js</b>
      </span>
    </footer>
  );
};

export default Footer;
