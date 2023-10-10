import { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "./ApiProvider";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      if (api.isAuthenticated()) {
        const response = await api.get("/api/auth/me");
        if (!response.error) {
          setUser(response);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    })();
  }, [api]);

  const logout = async () => {
    const response = await api.post("/api/auth/logout", null);
    if (response.success) {
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
