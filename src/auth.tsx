import React from 'react';

// https://tanstack.com/router/v1/docs/framework/react/examples/authenticated-routes-context

export type AuthContextType = {
  isAuthenticated: boolean;
  setUser: (username: string | null) => void;
  user: string | null;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(null);
  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
