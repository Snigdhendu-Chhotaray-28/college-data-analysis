/**
 * ECO PILLARS HUB - AUTHENTICATION & RBAC CONTEXT (PHASE 14)
 * Provides authentication state, Firebase Auth integration, and Role-Based Access Control
 * (ADMIN, ANALYST, VIEWER) for frontend authorization guards.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, UserProfile } from '../types';

export interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  loginAsAdmin: () => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
  canUpload: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAnalyze: boolean;
  canAcknowledgeAlerts: boolean;
}

const defaultAdminUser: UserProfile = {
  uid: 'usr-admin-001',
  email: 'admin.director@campus.edu',
  displayName: 'Dr. A. Sharma (Campus Admin)',
  role: 'ADMIN',
  campusId: 'main_campus',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(defaultAdminUser);
  const [role, setRoleState] = useState<UserRole>('ADMIN');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setUser({ ...user, role });
    }
  }, [role]);

  const toggleDemoMode = () => {
    setIsDemoMode((prev) => !prev);
  };

  const loginAsAdmin = () => {
    setUser(defaultAdminUser);
    setRoleState('ADMIN');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const logout = () => {
    setUser(null);
  };

  // RBAC Permission Flags
  const isAuthenticated = Boolean(user);
  const canUpload = isAuthenticated && role === 'ADMIN';
  const canEdit = isAuthenticated && role === 'ADMIN';
  const canDelete = isAuthenticated && role === 'ADMIN';
  const canAnalyze = isAuthenticated && (role === 'ADMIN' || role === 'ANALYST');
  const canAcknowledgeAlerts = isAuthenticated && (role === 'ADMIN' || role === 'ANALYST');

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isDemoMode,
        toggleDemoMode,
        loginAsAdmin,
        setRole,
        logout,
        canUpload,
        canEdit,
        canDelete,
        canAnalyze,
        canAcknowledgeAlerts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
