import React, { createContext } from 'react';
import { auth } from '../../Components/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ registerWithEmailAndPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
