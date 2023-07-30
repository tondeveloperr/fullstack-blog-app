import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import "../login/login.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/register", inputs);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setIsError(error.response.data.message);
      }
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        <span>
          Do you have an account?{" "}
          <Link className="link" to="/login">
            <p>Login</p>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
