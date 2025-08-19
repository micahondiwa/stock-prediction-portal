import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import logo from "../assets/images/logo.png"

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <img src={logo} alt="Logo" className="me-2" style={{ height: "200px", width: "200px" }} />
            <Link className="btn btn-info" to="" >Home</Link>

            <div className="ms-auto">
                {!isLoggedIn ? (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                        <Link className="btn btn-info" to="/register">Register</Link>
                    </>
                ) : (
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Header;
