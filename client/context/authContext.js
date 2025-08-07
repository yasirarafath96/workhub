"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signUpUser } from "@/api/mutations/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken) setAccessToken(storedToken);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.warn("Failed to parse stored user:", err);
        sessionStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);


  const login = async (email, password) => {
    try {
      const { token, user } = await loginUser({ email, password });

      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      setAccessToken(token);
      setUser(user);

      router.replace("/dashboard");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { accessToken: token, user } = await signUpUser({ name, email, password });

      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      setAccessToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      return { success: false, message };
    }
  };
  
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    setAccessToken("");
    setUser(null);
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
