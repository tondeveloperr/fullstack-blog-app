import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setIsError(error.response.data.message);
      }
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        {isError && <p>{isError}</p>}
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>

        <span>
          Don&rsquo;t you have an account?{" "}
          <Link className="link" to="/register">
            <p>Register</p>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
