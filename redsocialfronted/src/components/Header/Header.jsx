import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));
    const role = passport?.role; 
    const token = passport?.token;

    useEffect(() => {
        if (role === 2) {
            navigate("/admin");
        }
    }, [role, navigate]);

    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    };


    return (
        <header className="header">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            {role === 2 ? (<NavLink to="/admin" className="nav-link">Admin</NavLink>) : null}
            {token ? (
                <NavLink to="/login" onClick={logOut}>Logout</NavLink>
            ) : null}
          
        </header>
    );
};

