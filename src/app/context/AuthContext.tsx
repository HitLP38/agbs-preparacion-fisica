// src/app/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/domain/entities/User';
import { Gender, Grade } from '@/domain/entities/Exercise';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'agbs_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Guardar usuario en localStorage al hacer login
  const login = (userData: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
