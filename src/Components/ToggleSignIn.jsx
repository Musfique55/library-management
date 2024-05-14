import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const ToggleSignIn = () => {
    const {googleLogin} = useContext(AuthContext);

    const google = () => {
        googleLogin()
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        }) 
    }
    return (
        <div>
            <button onClick={() => google()}>sign with google</button>
        </div>
    );
};

export default ToggleSignIn;