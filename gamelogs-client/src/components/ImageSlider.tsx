import React, { useState, useEffect } from 'react';
import bo6 from '../assets/images/bo6.png';
import botw from '../assets/images/botw-featured.jpg';
import sparking from '../assets/images/sparking.jpg';
import metaphor from '../assets/images/metaphor.jpg';
import league from '../assets/images/league.png';

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        bo6,
        botw,
        sparking,
        metaphor,
        league
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="image-slider">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`slider-image ${currentIndex === index ? 'active' : ''}`}
                />
            ))}
            <div className="slider-dots">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;