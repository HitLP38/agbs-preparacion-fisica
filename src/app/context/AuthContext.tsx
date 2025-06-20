// src/app/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';
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

  // 🟢 Clerk hook: usuario autenticado
  const { user: clerkUser } = useClerkUser();

  // Cargar desde localStorage si existe
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // 🟢 Sincronizar automáticamente cuando Clerk inicie sesión
  useEffect(() => {
    if (clerkUser) {
      const mappedUser: User = {
        id: clerkUser.id,
        name: clerkUser.fullName || 'Usuario',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        gender: Gender.MALE, //  Enum correcto
        grade: Grade.FIRST, //  Enum correcto
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mappedUser));
      setUser(mappedUser);
    }
  }, [clerkUser]);

  // Iniciar sesión manualmente (usado en formulario personalizado si lo necesitas)
  const login = (userData: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  // Cerrar sesión manual (esto no cierra Clerk, solo tu estado local)
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

// Hook personalizado para acceder al contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
