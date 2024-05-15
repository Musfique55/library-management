import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext } from "react";
import auth from "../../firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const googleAuth = new GoogleAuthProvider();


    const register = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    const update = (name,url) => {
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : url
        });
    }

    const logout = () => {
        return signOut(auth);
    }
    const googleLogin = () => {
        return signInWithPopup(auth,googleAuth);
    }
    const authInfo = {googleLogin,register,login,logout,update};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children : PropTypes.node
}

export default AuthProvider;