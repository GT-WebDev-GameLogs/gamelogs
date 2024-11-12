import React from 'react';
import '../login-styles/App.css';
import googleLogo from '../assets/images/google.png';

const LoginForm = () => {
    return (
        <div className="login-container">
            <div className="login-form">
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
                <form action="http://localhost:7776/login">
                  <button type="submit" className="btn google-btn">
                      <img src={googleLogo} alt="Google" style={{ width: '18px', marginRight: '8px' }} /> Login with Google
                  </button>
                </form>
                <div className="forgot-password">
                    <a href="#">Forgot your password?</a>
                </div>
                <div className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
