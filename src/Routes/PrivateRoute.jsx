/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";

const PrivateRoute = ({children}) => {
    const {user, loader} = useContext(AuthContext) 
    const location = useLocation()

    if(loader){
        return <Loader></Loader>
    }
    if(user){
        return children
    }
    
    return (
        <div>
            <Navigate to="/login" state={{ from: location }} replace></Navigate>
        </div>
    )
};

export default PrivateRoute;