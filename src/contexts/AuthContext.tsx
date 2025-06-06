
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Resende',
    email: 'admin@resendemh.com.br',
    role: 'admin',
    department: 'TI'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao.silva@resendemh.com.br',
    role: 'user',
    department: 'Vendas'
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria.santos@resendemh.com.br',
    role: 'user',
    department: 'Financeiro'
  }
];

// Função para gerar usuário a partir do email
const generateUserFromEmail = (email: string): User => {
  const namePart = email.split('@')[0];
  const formattedName = namePart
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  
  return {
    id: Date.now().toString(),
    name: formattedName,
    email: email,
    role: email === 'admin@resendemh.com.br' ? 'admin' : 'user',
    department: 'Geral'
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if email is from @resendemh.com.br domain
    if (!email.endsWith('@resendemh.com.br')) {
      throw new Error('Acesso restrito para emails @resendemh.com.br');
    }

    // Simulate API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check password
    if (password === '123456') {
      // First check if user exists in mock data
      let foundUser = mockUsers.find(u => u.email === email);
      
      // If not found, generate user from email
      if (!foundUser) {
        foundUser = generateUserFromEmail(email);
      }
      
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
