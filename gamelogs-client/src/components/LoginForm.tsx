import React from 'react';
import '../styles/App.css';
import googleLogo from '../images/google.png';

const LoginForm = () => {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login to GameLogs</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn login-btn">Login</button>
                <button type="button" className="btn google-btn">
                    <img src={googleLogo} alt="Google" style={{ width: '18px', marginRight: '8px' }} /> Login with Google
                </button>
                <div className="forgot-password">
                    <a href="#">Forgot your password?</a>
                </div>
                <div className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
