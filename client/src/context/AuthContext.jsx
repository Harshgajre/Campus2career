import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roleDetails, setRoleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('c2c_token');
      const savedUser = localStorage.getItem('c2c_user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const res = await authService.getMe();
          if (res.success) {
            setUser(res.user);
            setRoleDetails(res.roleDetails);
            localStorage.setItem('c2c_user', JSON.stringify(res.user));
          }
        } catch (error) {
          localStorage.removeItem('c2c_token');
          localStorage.removeItem('c2c_user');
          localStorage.removeItem('c2c_user_role');
          setUser(null);
          setRoleDetails(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      const res = await authService.login({ email, password, role });
      if (res.success) {
        if (role && res.user.role !== role) {
          return {
            success: false,
            message: `Account is not registered as a ${role}. Please use the correct login portal.`,
          };
        }
        localStorage.setItem('c2c_token', res.token);
        localStorage.setItem('c2c_user', JSON.stringify(res.user));
        localStorage.setItem('c2c_user_role', res.user.role);
        setUser(res.user);
        setRoleDetails(res.roleDetails);
        return { success: true, role: res.user.role, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Invalid email or password' };
    }
  };

  const register = async (role, data) => {
    try {
      let res;
      if (role === 'student') res = await authService.registerStudent(data);
      else if (role === 'college') res = await authService.registerCollege(data);
      else if (role === 'company') res = await authService.registerCompany(data);

      if (res.success) {
        localStorage.setItem('c2c_token', res.token);
        localStorage.setItem('c2c_user', JSON.stringify(res.user));
        localStorage.setItem('c2c_user_role', role);
        setRoleDetails(res.roleDetails || res.student || res.college || res.company || null);
        return { success: true, role: res.user.role };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Backend is unavailable' };
    }
  };

  const logout = () => {
    localStorage.removeItem('c2c_token');
    localStorage.removeItem('c2c_user');
    localStorage.removeItem('c2c_user_role');
    sessionStorage.removeItem('c2c_token');
    sessionStorage.removeItem('c2c_user');
    sessionStorage.removeItem('c2c_user_role');
    setUser(null);
    setRoleDetails(null);
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await authService.updateProfile(updatedData);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem('c2c_user', JSON.stringify(res.user));
        return { success: true };
      }
    } catch (err) {
      // Local update fallback
      setUser((prev) => ({ ...prev, ...updatedData }));
      localStorage.setItem('c2c_user', JSON.stringify({ ...user, ...updatedData }));
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        roleDetails,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
