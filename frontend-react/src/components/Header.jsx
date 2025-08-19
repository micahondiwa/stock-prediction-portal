import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">STOCK PREDICTION</Link>

            <div className="ms-auto">
                {!isLoggedIn ? (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/login">
                            Login
                        </Link>
                        <Link className="btn btn-info" to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Header;
