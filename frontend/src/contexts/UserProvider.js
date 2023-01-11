import { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "./ApiProvider";

const UserContext = createContext();

export default function UserProvider({ children }) {
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
