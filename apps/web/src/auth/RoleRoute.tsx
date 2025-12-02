import React, { JSX } from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

export default function RoleRoute({allowed,childer}:{allowed:string[];childer:JSX.Element}){
  const { user } = useAuth();
  if(!user) return <Navigate to={"/login"} replace/>
  if(!allowed.includes(user.role)){
    return <Navigate to={`/${user.role}`} replace/>
  }
  return childer
}
