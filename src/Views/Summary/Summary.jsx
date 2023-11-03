import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import './Summary.css'
import { useEffect } from 'react';

export default function Summary(){
    const location = useLocation();
    let navigate = useNavigate();
    const { averageTime, totalRight, totalTimedOut, highestLevel } = location.state || {};

    useEffect(() => {
        console.log(averageTime)
        console.log(totalRight)
        console.log(totalTimedOut)
        console.log(highestLevel)
    }, [])

    return (
        <main className="summary-container">
            <h1 className="logo" onClick={() => {navigate("/")}}>WITTY</h1>
            <div className="summary-field">
                <h1 className="summary-title">Summary</h1>
                <div className="stats-field">
                    <h2>Average Answer Time: {averageTime.toFixed(2)} seconds</h2>
                    <h2>Highest Level Reached: {highestLevel + 1}</h2>
                    <h2>Total Correct: {totalRight}</h2>
                    <h2>Total Timed Out: {totalTimedOut}</h2>
                </div>
                <button className="home" onClick={() => navigate("/")}>HOME</button>
            </div>
            <Footer/>
        </main>
    )
}