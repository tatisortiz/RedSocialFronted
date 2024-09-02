import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/apiCalls";
import { jwtDecode } from "jwt-decode";

import "./Login.css"


export const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const loginButton = async () => {
        try {
            const response = await loginUser(credentials);

            if (response.success) {
                const decodedToken = jwtDecode(response.data);
                const passport = {
                    token: response.data,
                    tokenData: decodedToken,
                };

                localStorage.setItem("passport", JSON.stringify(passport));
                navigate('/profile');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-div">
                <div className="login-title">
                    <span>Please sign in </span>
                </div>
                <div className="login-subtitle">
                    Sign In Using Your Registered Account
                </div>
                <input
                    className="input-field"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input className="login-button" type="button" value="Sign in" onClick={loginButton} />
                <div className="login-div-link">
                    <a className="login-div-a">Don't have an account?- </a><a className="login-div-a-link" onClick={()=>{navigate('/register');}}> Sign Up</a>
                </div>
            </div>
        </div>
    );
};
