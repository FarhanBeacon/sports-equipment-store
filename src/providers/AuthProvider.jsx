import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up new users with email and password
  const createUser= (eamil, password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, eamil, password);
  }

  // Sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Sign in existing users
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Update user profile
    const updateUserProfile = (username) => {
        return updateProfile(auth.currentUser, {
            displayName: username,
        });
    }

    // Sign out users
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Monitor auth state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                setUser(currentUser);
            }
            else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    },[user])

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
