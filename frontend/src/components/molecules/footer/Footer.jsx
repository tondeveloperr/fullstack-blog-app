import { IconGithub, IconLinkedin, IconYoutube } from "../../../assets/icons";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <h3>Ikuti Kami di</h3>
      <div className="icon-sosmed">
        <img
          src={IconLinkedin}
          alt="icon"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/kartono-saleh-8aab8017b/",
              "_blank"
            )
          }
        />
        <img
          src={IconGithub}
          alt="icon"
          onClick={() =>
            window.open("https://github.com/tondeveloperr", "_blank")
          }
        />
        <img
          src={IconYoutube}
          alt="icon"
          onClick={() =>
            window.open("https://www.youtube.com/@kartonobinsaleh", "_blank")
          }
        />
      </div>
      <span className="maker">
        <p>
          &copy;2023{" "}
          <span
            onClick={() =>
              window.open("https://kartono-portfolio.vercel.app", "_blank")
            }
          >
            TonDeveloper
          </span>
          .
        </p>{" "}
        <p>Made with ❤️ and React.js</p>
      </span>
    </footer>
  );
};

export default Footer;
