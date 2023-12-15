import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Footer/Footer'
import Waves from '../../assets/waves.png'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
    let navigate = useNavigate();
    const [buttonText, setButtonText] = useState("START");

    useEffect(() => {
        const updateButtonText = () => {
            if (window.innerWidth <= 768) {
                setButtonText("Sorry, not supported on mobile");
            } else {
                setButtonText("START");
            }
        };

        // Check when the component mounts
        updateButtonText();

        // Add event listener for window resize
        window.addEventListener('resize', updateButtonText);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', updateButtonText);
    }, []);

    const handleStartClick = () => {
        if (window.innerWidth > 768) {
            navigate("/trainer");
        }
    };

    return (
        <main className="home-container">
            <nav className="header">
                <h1 className="logo">WITTY</h1>
                <button className="start-btn" onClick={handleStartClick}>{buttonText}</button>
            </nav>
            <h1 className="landing-text">
                Think<br /><span className="orange">Fast</span>
            </h1>
            <h2 className="landing-sub">
                Improve your mental math today.
            </h2>
            <Footer />
            <img src={Waves} alt="" className="waves" />
        </main>
    );
}
