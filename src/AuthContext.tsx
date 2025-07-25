import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  role: string | null;
  login: (token: string, role: string) => void; 
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

 const login = (token: string, userRole: string) => {
  setIsAuthenticated(true);
  setRole(userRole);
  localStorage.setItem("token", token); 
  localStorage.setItem("role", userRole);
};


  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
