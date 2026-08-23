import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  getCurrentUser,
} from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  );

  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const data = await loginUser(email, password);

    localStorage.setItem(
      "access_token",
      data.access_token
    );

    setToken(data.access_token);

    const currentUser = await getCurrentUser();

    setUser(currentUser);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(
          "Failed to load current user:",
          error
        );

        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
      }
    };

    loadCurrentUser();
  }, [token]);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}