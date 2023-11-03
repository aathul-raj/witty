import { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import useTracker from "../../Hooks/useTracker";
import { useNavigate } from "react-router-dom";
import './Trainer.css'

export default function Trainer(){
    
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showLevelDown, setShowLevelDown] = useState(false);
    const [level, setLevel] = useState(0);
    const [seconds, setSeconds] = useState(5);
    let navigate = useNavigate();
    const [problem, setProblem] = useState({first: "", operator: "", second: ""}); // Separate parts of the problem
    const [answer, setAnswer] = useState(""); // User's answer
    const [answers, setAnswers] = useState({points: 0, totalTime: 0, numProblems: 0, wrong: 0})
    const [highestLevel, setHighestLevel] = useState(0);

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const calcOperator = () => {
        let max = 2;
        if (level == 1){
            max = 3;
        } else if (level == 2){
            max = 4;
        }

        let operator = String(getRandomNumber(1,max))
        if (operator == 1){
            operator = "+"
        } else if (operator == 2){
            operator = "-"
        } else if (operator == 3){
            operator = "×"
        } else{
            operator = "/"
        }

        return operator
    }

    const newProblem = (operator) => {
        let first, second;

        if ((operator != "×" && operator != "/") && (level == 1 || level == 2)){
            first = String(getRandomNumber(1,50));
            second = String(getRandomNumber(1,50));
        }
        else if (operator === "/" && level == 2) {
            // For division, get a divisor and a dividend that ensures whole number quotient
            second = String(getRandomNumber(1, 10));  // Get a divisor
            first = String(getRandomNumber(1, 10) * parseInt(second));  // Get a dividend
        } else if (level == 3 && (operator != "/" || operator != "×")){
            first = String(getRandomNumber(1,100));
            second = String(getRandomNumber(1,100));
        } else if (level == 3 && operator == "/"){
            // For division, get a divisor and a dividend that ensures whole number quotient
            second = String(getRandomNumber(1, 25));  // Get a divisor
            first = String(getRandomNumber(1, 25) * parseInt(second));  // Get a dividend
        } else if (level == 3 && operator == "×"){
            first = String(getRandomNumber(1,25));
            second = String(getRandomNumber(1,25));
        } else if ((operator != "×" || operator != "/") && level == 4){
            first = String(getRandomNumber(1,1000));
            second = String(getRandomNumber(1,1000));
        } else if ((operator == "×" || operator == "/") && level == 4){
            first = String(getRandomNumber(1,100));
            second = String(getRandomNumber(1,first));
        }
        else {
            first = String(getRandomNumber(1,10));
            second = String(getRandomNumber(1,10));
        }

        setProblem({first: first, operator: operator, second: second});
    }

    const handleFinish = () => {
        // Calculate the average answer time if numProblems is not zero to avoid division by zero
        const averageTime = answers.numProblems > 0 ? answers.totalTime / answers.numProblems : "N/A";
        // Calculate the total right
        const totalRight = answers.numProblems - answers.wrong;
        // Calculate the total timed out
        const totalTimedOut = answers.wrong; // Assuming 'wrong' includes timeouts

        navigate('/summary', {
            state: {
                averageTime: averageTime,
                totalRight: totalRight,
                totalTimedOut: totalTimedOut,
                highestLevel: highestLevel
            }
        });
    }

    const handleChange = useTracker(setAnswers, answers, setSeconds, setAnswer, problem, seconds, setLevel, calcOperator, newProblem, setShowLevelUp);
    
    useEffect(() => {
        const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
        if (seconds === 0) {
            // Reset math problem when timer hits 0
            const operator = calcOperator();  // Use the calcOperator function
            newProblem(operator);  
            setSeconds(5); // Reset timer to 5 seconds
            setAnswer("")
            setAnswers((prevAnswers) => {
                if ((level > 0) && (prevAnswers.points - 1 == -1)){
                    setLevel((prevLevel) => prevLevel - 1)
                    setShowLevelDown(true);
                    setTimeout(() => setShowLevelDown(false), 2000);
                    return {...prevAnswers, points: 10, totalTime: prevAnswers.totalTime + 5, numProblems: prevAnswers.numProblems + 1, wrong: prevAnswers.wrong + 1}
                } else if ((level == 0) && (prevAnswers.points == 0)){
                    return prevAnswers
                }
                return {...prevAnswers, points: prevAnswers.points - 1, totalTime: prevAnswers.totalTime + 5, numProblems: prevAnswers.numProblems + 1, wrong: prevAnswers.wrong + 1}
            })
        }
        return () => clearInterval(timer); // This function gets called by React when the component unmounts, which is the right time to clear the interval to prevent memory leaks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    useEffect(() => {
        console.log(answers)
        console.log(level)
    }, [answers, level])

    useEffect(() => {
        const operator = calcOperator();
        newProblem(operator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setHighestLevel((prevLevel) => {
            if (level > prevLevel){
                return level
            }
            return prevLevel
        })
    }, [level])

    return (
        <main className="trainer-container">
            <h1 className="logo" onClick={() => {navigate("/")}}>WITTY</h1>
            {/* <div className="trainer-header-buttons">
                <div className="arithmetic-button">
                    {arithmetics.map((arithmeticItem) => (
                        <MenuButton 
                            text={arithmeticItem} 
                            key={arithmeticItem} 
                            isActive={activeArithmetic === arithmeticItem} 
                            setActive={() => setActiveArithmetic(arithmeticItem)}
                        />
                    ))}
                </div>
                <div className="timer-button">
                    {timer.map((timerItem) => (
                        <MenuButton 
                            text={timerItem} 
                            key={timerItem} 
                            isActive={activeTimer === timerItem} 
                            setActive={() => setActiveTimer(timerItem)}
                        />
                    ))}
                </div>
            </div> */}
            <div className="problem-field">
                <span style={{ color: 'white' }}>{problem.first}</span>
                <span style={{ color: '#4B3B40' }}>{problem.operator}</span>
                <span style={{ color: 'white' }}>{problem.second} =</span>
                <input 
                    type="number" 
                    maxLength="4"
                    value={answer}
                    onChange={(e) => handleChange(e.target.value)} 
                    autoFocus
                    style={{ color: '#4B3B40', caretColor: '#4B3B40' }} // The input text and caret color
                />
            </div>
            <div className="timer-field">
                <h1 className="timer"><span className="seconds">{seconds}</span> seconds left</h1>
            </div>
            <button className="finish" onClick={() => handleFinish()}>FINISH</button>
            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{width: `${(answers.points / 10) * 100}%`}}></div>
            </div>
            {showLevelUp && (
                <div className="level-up-animation">
                    Level Up!
                </div>
            )}
            {showLevelDown && (
                <div className="level-down-animation">
                    Level down!
                </div>
            )}
            <Footer/>
        </main>
    );
}
