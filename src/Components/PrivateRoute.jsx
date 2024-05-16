import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import PropTypes from 'prop-types';
const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    if(loading){
        return <span className="loading loading-spinner text-error"></span>
    }
    if(user){
        return children;
    }
    
};

PrivateRoute.propTypes = {
    children : PropTypes.node
}

export default PrivateRoute;