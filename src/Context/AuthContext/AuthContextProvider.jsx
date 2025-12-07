import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword (auth,email,password);
    }

    const googleLogIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (profile)=>{
        // setLoading(true);
        return updateProfile(auth.currentUser,profile)
    }
    const logOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    //observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[]);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        googleLogIn,
        updateUserProfile,
        logOutUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthContextProvider;