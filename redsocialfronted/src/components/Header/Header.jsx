import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));
    const role = passport?.tokenData.role; 
    const token = passport?.token;
    
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavLinkClick = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    const logOut = () => {
        localStorage.removeItem("passport");
        handleNavLinkClick("/login");
    };

    return (
        <header className="header">
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <div className={`header-div ${menuOpen ? "open" : ""}`}>
                {!token ? (
                    <>
                        <div className="nav-link" onClick={() => handleNavLinkClick("/")}>Home</div>
                        <div className="nav-link" onClick={() => handleNavLinkClick("/register")}>Register</div>
                        <div className="nav-link" onClick={() => handleNavLinkClick("/login")}>Login</div>
                    </>
                ) : (
                    <>
                        {role === "super_admin" ? (
                            <>
                                <div className="nav-link" onClick={() => handleNavLinkClick("/admin")}>Admin</div>
                                <div className="nav-link" onClick={() => handleNavLinkClick("/worldPosts")}>WorldPosts</div>
                                <div className="nav-link" onClick={() => handleNavLinkClick("/profile")}>MyProfile</div>
                                <div className="nav-link" onClick={logOut}>Logout</div>
                            </>
                        ) : (
                            <>
                                <div className="nav-link" onClick={() => handleNavLinkClick("/worldPosts")}>WorldPosts</div>
                                <div className="nav-link" onClick={() => handleNavLinkClick("/profile")}>MyProfile</div>
                                <div className="nav-link" onClick={logOut}>Logout</div>
                            </>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};
