import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/auth.config';

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState(null);
    const creatUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

     const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            try {
                const token = await getIdToken(currentUser); // ✅ Get access token
                setAccessToken(token);                       // ✅ Set access token
            } catch (error) {
                console.error("Failed to get token:", error);
                setAccessToken(null);
            }
        } else {
            setUser(null);
            setAccessToken(null);
        }
        setLoading(false);
    });

    return () => unSubscribe(); // ✅ Clean up subscription
}, []);



    const userInfo = {
        user,
        setUser,
        loading,
        loginUser,
        creatUser,
        signOutUser,
        accessToken
        


    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;