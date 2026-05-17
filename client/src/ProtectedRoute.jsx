import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children,allowedRoles}) {
    const {role} = useSelector(state=> state.auth)

    //user not logged In
    if(!role)
        return <Navigate to="/"/>

    //Logged in but wrong    
    if(allowedRoles && allowedRoles !== role)   
        return <Navigate to="/"/>

    return  children
}

export default ProtectedRoute
