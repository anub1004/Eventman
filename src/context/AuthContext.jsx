import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const res = await authAPI.login(data);

    const safeUser = {
      ...res.data.data,
      createdEvents: [],
      invitedEvents: [],
    };

    setUser(safeUser);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const init = async () => {
      try {
        const res = await authAPI.me();
        setUser({
          ...res.data.data,
          createdEvents: [],
          invitedEvents: [],
        });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
