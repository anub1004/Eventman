import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      const userData = res.data.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return userData;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await authAPI.register({ name, email, password });
      const userData = res.data.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return userData;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
