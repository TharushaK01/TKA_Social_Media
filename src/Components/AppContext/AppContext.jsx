import React, { createContext, useState, useEffect } from 'react';
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from "../firebase/firebase";
import { query, where, collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AppContext = ({ children }) => {
    const collectionUsersRef = collection(db, "users");
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const popup = await signInWithPopup(auth, provider);
            const user = popup.user;
            const q = query(collectionUsersRef, where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collectionUsersRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    Image: user.photoURL,
                    authProvider: popup.providerId,
                });
            }
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    };

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    };

    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collectionUsersRef, {
                uid: user.uid,
                name,
                ProviderId: "email/password",
                email: user.email,
            });
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    };

    const sendPasswordToUser = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("New password sent to your email");
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    };

    const signOutUser = async () => {
        await signOut(auth);
        setUser(null);
        setUserData(null);
        navigate("/login");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const q = query(collectionUsersRef, where("uid", "==", currentUser.uid));
                const snapshot = await onSnapshot(q, (doc) => {
                    setUserData(doc?.docs[0]?.data());
                });
                setUser(currentUser);
                navigate("/");
            } else {
                setUser(null);
                setUserData(null);
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const initialState = {
        signInWithGoogle,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordToUser,
        signOutUser,
        user,
        userData,
    };

    return (
        <AuthContext.Provider value={initialState}>
            {children}
        </AuthContext.Provider>
    );
};

export default AppContext;