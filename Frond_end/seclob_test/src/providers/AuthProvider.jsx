import { URLS } from "../constants/apiUrls"; 
import { PATHS } from "@/constants/paths";
import { apiCall } from "../services/apiCall"; 
import { jwtDecode } from "jwt-decode";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
console.log(user,"useruseruseruser")
  // LOGIN FUNCTION
  const login = async (body) => {
    const { email, password } = body;

    const trimmedBody = {
      email: email.trim(),
      password: password.trim(),
    };

    const response = await apiCall("post", URLS.LOGIN, trimmedBody, null, false);
console.log(response,"responseresponseresponseresponse")
    const { token } = response?.data

    if (token) {
      localStorage.setItem("token", token);
      

      const decodedUser = jwtDecode(token);
      console.log()
      setUser(decodedUser);
    }

    return response;
  };

  // REGISTER FUNCTION
  const register = async (body) => {
    const { name, email, password } = body;

    const trimmedBody = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    const response = await apiCall("post", URLS.REGISTER, trimmedBody, null, false);

    const { token } = response?.data

    if (token) {
      localStorage.setItem("token", token);
     

      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }

    return response;
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    window.location.href = PATHS.LOGIN;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};