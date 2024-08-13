import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { loginUser } from "../../components/Header/Services/apiCalls";
import { jwtDecode } from "jwt-decode";


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
                const decodedToken = jwtDecode(response.token);
                const passport = {
                    token: response.token,
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
        <div className="login">
            <div className="loginone">
                <h1>login</h1>
                <h2>Create an account or login</h2>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input type="button" value="login" onClick={loginButton} />
            </div>
        </div>
    );
};
