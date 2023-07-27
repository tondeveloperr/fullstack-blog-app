import { useNavigate } from "react-router-dom";
import "./page404.scss";

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="page-404">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default Page404;
