import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const response = await axiosInstance.post("/login", inputs);
    setCurrentUser(response.data);
  };

  const logout = async () => {
    await axiosInstance.post("/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
