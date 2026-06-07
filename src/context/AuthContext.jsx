import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          
          // Verify session validity with backend
          const response = await API.get("/auth/me");
          if (response.data.success) {
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        } catch (error) {
          console.error("Session verification failed, logged out.");
          logoutUser();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await API.post("/auth/login", { email, password });
      if (response.data.success) {
        const { accessToken, refreshToken, user: userData } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please check your credentials.",
      };
    }
  };

  const googleLoginUser = async (credential) => {
    try {
      const response = await API.post("/auth/google", { credential });
      if (response.data.success) {
        const { accessToken, refreshToken, user: userData } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Google Sign-In failed.",
      };
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await API.post("/auth/register", formData);
      if (response.data.success) {
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      };
    }
  };

  const verifyUserEmail = async (token) => {
    try {
      const response = await API.post("/auth/verify-email", { token });
      return { success: response.data.success, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Email verification failed.",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserProfile = async (profileData) => {
    try {
      const response = await API.put("/auth/profile", profileData);
      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.user };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loginUser,
        googleLoginUser,
        registerUser,
        verifyUserEmail,
        logoutUser,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
