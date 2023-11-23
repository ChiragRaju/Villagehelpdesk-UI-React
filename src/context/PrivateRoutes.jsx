import React from "react";
import {useAuth} from "../context/AuthContext"
import { Navigate } from "react-router-dom";
export const  PrivateRoute=({ children })=> {
    const auth= useAuth();
   
    // If the user is not authenticated, redirect to the login page
    if(!auth.user){
      return <Navigate to='/Login'/>
    }else
  return children;
  }