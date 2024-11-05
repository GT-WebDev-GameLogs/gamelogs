import React from 'react';
import ImageSlider from './components/ImageSlider';
import LoginForm from './components/LoginForm';
import './styles/App.css';

const App = () => {
    return (
        <div className="background">
            <ImageSlider />
            <LoginForm />
        </div>
    );
};

export default App;
