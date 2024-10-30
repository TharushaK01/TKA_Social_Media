import React, { createContext, useContext } from 'react';
import { auth } from '../../Components/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();

    const registerWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmailAndPassword = async (email, password) => {
        return auth.signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = async () => {
        return signInWithPopup(auth, provider);
    };

    return (
        <AuthContext.Provider value={{ registerWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

