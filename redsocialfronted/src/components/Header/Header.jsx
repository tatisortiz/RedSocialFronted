import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    const navigate = useNavigate();


    return (
        <header className="header">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          
        </header>
    );
};

