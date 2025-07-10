
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se já está autenticado no localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      console.log('Tentando fazer login com senha:', password);
      
      // Use RPC function to get the password
      const { data, error } = await supabase.rpc('get_admin_password');

      console.log('Resposta da função RPC:', { data, error });

      if (error) {
        console.error('Erro na função RPC:', error);
        throw error;
      }

      console.log('Senha do banco:', data);
      console.log('Senha fornecida:', password);
      console.log('Senhas são iguais?', data === password);

      if (data === password) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        toast.success('Login realizado com sucesso!');
        return true;
      } else {
        toast.error('Senha incorreta');
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao verificar senha');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
