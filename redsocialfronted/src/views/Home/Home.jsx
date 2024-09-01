import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        createBackgroundCircles();
    }, []);

    const createBackgroundCircles = () => {
        const animationContainer = document.querySelector('.home-animation');
        for (let i = 0; i < 5; i++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            animationContainer.appendChild(circle);
        }
    };

    return (
        <div className="home-container">
            <div className="home-animation"></div>
            <div className="home-content">
                <h1 className="home-title">Welcome to Our Network</h1>
                <p className="home-description">Connect, share, and explore with others around the world.</p>
                <div className="home-buttons">
                    <button onClick={() => navigate('/login')} className="home-button">Sign In</button>
                    <button onClick={() => navigate('/register')} className="home-button">Sign Up</button>
                </div>
            </div>
        </div>
    );
};
