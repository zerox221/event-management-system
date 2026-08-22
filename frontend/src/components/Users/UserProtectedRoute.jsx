import React from 'react'
import { Navigate } from 'react-router-dom'

const UserProtectedRoute = ({user,children}) => {

    console.log("inside protected route ",user)

    if(!user){
        <Navigate to={'/'} replace/>
    }
    if(user?.role === "organizer"){
        <Navigate to={"/admin"} replace/>
    }
    if(user?.role==="user"){
        return children;
    }

    return <Navigate to="/" replace />;
}

export default UserProtectedRoute;