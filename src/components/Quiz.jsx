import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    // It's a good practice to manage as less amount of state values as possible
    // That's why it's better to derive computed values when possible
    const currentQuestionIndex = userAnswers.length;

    const isQuizComplete = currentQuestionIndex === QUESTIONS.length;

    // We need to wrap the handle answer selection functions to be used as onTimeout prop by QuestionTimer
    const handleSelectAnswer = useCallback(function handleSelectQuestion(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(isQuizComplete){
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    // Note that we need to move this derived state array to avoid accessing invalid indexes when the quiz is complete
    // Shuffling the answers to have a different orfder every time the component gets loaded
    const shuffledAnswers = [...QUESTIONS[currentQuestionIndex].answers];
    // sort modifies the order of the array in place, for that reason we had to create a copy from QUESTIONS
    // sort receives a comparator
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer 
                // This is a trick using key prop used by react in lists, but it's used in this comp to force the re-render
                // of this component when the state of Quiz change.
                // QuestionTimer wouldn't be re-rendered because its props are always the same, so by setting the key prop to the index value, we ensure this component gets refreshed with the proper max
                    key={currentQuestionIndex}// 
                    timeout={10000} 
                    onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}