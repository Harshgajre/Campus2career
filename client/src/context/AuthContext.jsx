import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roleDetails, setRoleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearStoredSession = () => {
    localStorage.removeItem('c2c_token');
    localStorage.removeItem('c2c_user');
    localStorage.removeItem('c2c_user_role');
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('c2c_token');
      if (token) {
        try {
          // The token is the sole source of identity. Never hydrate UI identity
          // from a previous browser user's cached profile.
          const res = await authService.getMe();
          if (res.success) {
            setUser(res.user);
            setRoleDetails(res.roleDetails);
            localStorage.setItem('c2c_user', JSON.stringify(res.user));
          }
        } catch (error) {
          clearStoredSession();
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
        if (res.requireOtp) {
          return {
            success: true,
            requireOtp: true,
            message: res.message,
            maskedPhone: res.maskedPhone,
            email: res.email,
          };
        }
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

  const studentLoginInit = async (email, password) => {
    try {
      clearStoredSession();
      setUser(null);
      setRoleDetails(null);
      const res = await authService.studentLoginInit({ email, password });
      return res;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Invalid student credentials' };
    }
  };

  const studentLoginVerify = async (email, password, otp) => {
    try {
      const res = await authService.studentLoginVerify({ email, password, otp });
      if (res.success) {
        if (role === 'student') {
          // Students receive no authenticated session until their SMS OTP is verified.
          return { success: true, role: 'student', requiresLogin: true };
        }
        localStorage.setItem('c2c_token', res.token);
        localStorage.setItem('c2c_user', JSON.stringify(res.user));
        localStorage.setItem('c2c_user_role', res.user.role);
        setUser(res.user);
        setRoleDetails(res.roleDetails);
        return { success: true, role: res.user.role, user: res.user };
      }
      return { success: false, message: res.message || 'OTP verification failed' };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Invalid OTP code' };
    }
  };

  const studentResendOtp = async (email, password) => {
    try {
      const res = await authService.studentResendOtp({ email, password });
      return res;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to resend OTP' };
    }
  };

  const loginWithToken = async (token) => {
    try {
      localStorage.setItem('c2c_token', token);
      const res = await authService.getMe();
      if (res.success) {
        localStorage.setItem('c2c_user', JSON.stringify(res.user));
        localStorage.setItem('c2c_user_role', res.user.role);
        setUser(res.user);
        setRoleDetails(res.roleDetails);
        return { success: true, role: res.user.role, user: res.user };
      }
      localStorage.removeItem('c2c_token');
      return { success: false, message: 'Failed to verify token' };
    } catch (err) {
      localStorage.removeItem('c2c_token');
      return { success: false, message: err.response?.data?.message || 'Token verification failed' };
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
        setUser(res.user);
        setRoleDetails(res.roleDetails || res.student || res.college || res.company || null);
        return { success: true, role: res.user.role };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    clearStoredSession();
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
      return { success: false, message: err.response?.data?.message || 'Profile update failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        roleDetails,
        loading,
        login,
        studentLoginInit,
        studentLoginVerify,
        studentResendOtp,
        loginWithToken,
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
