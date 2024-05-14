import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext } from "react";
import auth from "../../firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const googleAuth = new GoogleAuthProvider();

    const googleLogin = () => {
        return signInWithPopup(auth,googleAuth);
    }
    const authInfo = {googleLogin};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;