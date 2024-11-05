import React from 'react';
import ImageSlider from './components/ImageSlider';
import LoginForm from './components/LoginForm';
import './login-styles/App.css';

const Login = () => {
    return (
        <div className="background">
            <ImageSlider />
            <LoginForm />
        </div>
    );
};

export default Login;
