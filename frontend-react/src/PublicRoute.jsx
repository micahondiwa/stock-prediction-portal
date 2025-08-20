import { Children, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

function PublicRoute() {
    return (
        <div>PublicRoute</div>
    )
}

export default PublicRoute