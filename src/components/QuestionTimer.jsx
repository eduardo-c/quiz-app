import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // Note we need to set the timers and intervals in side effects to avoid setting multiple timers eveery time the component re-renders
    // Note that when useEffect returns a function, it's known as clean up function. It's executed every time that the component renders or when it gets unmounted from the DOM
    // In this example, the clean up function is used to clear the interval and timer

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);// Rememenr that we need to pass any prop or state value used by side effect as dependency
    
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress 
            id="question-time" 
            max={timeout} 
            value={remainingTime} 
            className={mode}/>
    );
}