import React, { useState, createContext } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin: () => null,
        onRegister: () => null,
        onLogout: () => null,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
