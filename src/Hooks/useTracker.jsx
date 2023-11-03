import { useCallback } from 'react';

export default function useTracker(setAnswers, answers, setSeconds, setAnswer, problem, seconds, setLevel, calcOperator, newProblem, setShowLevelUp) {

    const handleChange = useCallback((input) => {
        setAnswer(input);
    
        const first = Number(problem.first);
        const second = Number(problem.second);

        let calcProblem;
        if (problem.operator === "×") {
            calcProblem = first * second;
        } else if (problem.operator === "+") {
            calcProblem = first + second;
        } else if (problem.operator === "-") {
            calcProblem = first - second;
        } else {
            calcProblem = first / second;
        }

        const operator = calcOperator();

        if (String(calcProblem) === String(input)) {
            setAnswers((prevAnswers) => {
                let newPoints = prevAnswers.points + 1;
                const newTotalTime = prevAnswers.totalTime + (5 - Number(seconds));
                const newNumProblems = prevAnswers.numProblems + 1;
            
                // Check for level up with the newPoints
                if (newPoints > 10) {
                    setShowLevelUp(true);
                    setTimeout(() => setShowLevelUp(false), 2000);
                    setLevel((prevLevel) => prevLevel + 1);
                    newPoints = 0;
                }
            
                return { 
                    ...prevAnswers,
                    points: newPoints, 
                    totalTime: newTotalTime, 
                    numProblems: newNumProblems
                };
            });
            newProblem(operator)
            setAnswer("");
            setSeconds(5); // Reset the timer to 5 seconds
        }
    }, [setAnswer, problem.first, problem.second, problem.operator, calcOperator, setAnswers, newProblem, setSeconds, seconds, setShowLevelUp, setLevel]);

    return handleChange;
}