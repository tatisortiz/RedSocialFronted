import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect } from "react";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));
    const role = passport?.tokenData.role; 
    const token = passport?.token;

    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    };


    return (
        <header className="header">
            <div className="header-div">
                {!token ? (
                    <>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                    </>
                ) : (
                    <>
                        {role === "super_admin" ? (
                           <>
                           <NavLink to="/admin" className="nav-link">Admin</NavLink>
                            <NavLink to="/worldPosts" className="nav-link">WorldPosts</NavLink>
                            <NavLink to="/profile" className="nav-link">MyProfile</NavLink>
                            <NavLink to="/login" className="nav-link" onClick={logOut}>Logout</NavLink>
                        </>
                        ):(<>
                            <NavLink to="/worldPosts" className="nav-link">WorldPosts</NavLink>
                            <NavLink to="/profile" className="nav-link">MyProfile</NavLink>
                            <NavLink to="/login" className="nav-link" onClick={logOut}>Logout</NavLink>
                        </>
                        )}
                        
                    </>
                )}
            </div>
            
          
        </header>
    );
};

