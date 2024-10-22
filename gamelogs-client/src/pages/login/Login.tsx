import { useEffect, useRef } from 'react';
import './styles.css';
import bo6 from '../../assets/images/bo6.png';
import botw from '../../assets/images/botw-featured.jpg';
import sparking from '../../assets/images/sparking.jpg';
import metaphor from '../../assets/images/metaphor.jpg';
import league from '../../assets/images/league.png';

export default function Login() {
    const imgRefs = [];
    for (let i = 0; i < 5; i++) {
        imgRefs.push(useRef(null))
    }
    useEffect(() => {
        let currentIndex = 0;
        const totalImages = imgRefs.length;

        function cycleImages() {
            imgRefs[currentIndex].current.classList.remove('active');
            currentIndex = (currentIndex + 1) % totalImages;
            imgRefs[currentIndex].current.classList.add('active');
            console.log(imgRefs[currentIndex].current)
        }

        setInterval(cycleImages, 5000);
    }, []);
    return (
        <div className="background">
            <div className="image-slider">
                <img ref={imgRefs[0]} src={bo6} alt="Image 1" className="active" />
                <img ref={imgRefs[1]} src={botw} alt="Image 2" />
                <img ref={imgRefs[2]} src={sparking} alt="Image 3" />
                <img ref={imgRefs[3]} src={metaphor} alt="Image 4" />
                <img ref={imgRefs[4]} src={league} alt="Image 5" />
            </div>
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
                        <img src="images/google.png" alt="Google" /> Login with Google
                    </button>
                    <div className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </div>
                    <div className="signup-link">
                        Don't have an account? <a href="#">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}