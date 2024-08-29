import { useState } from "react";

import QUESTIONS from '../questions.js'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    // It's a good practice to manage as less amount of state values as possible
    // That's why it's better to derive computed values when possible
    const currentQuestionIndex = userAnswers.length;

    // Shuffling the answers to have a different orfder every time the component gets loaded
    const shuffledAnswers = [...QUESTIONS[currentQuestionIndex].answers];
    // sort modifies the order of the array in place, for that reason we had to create a copy from QUESTIONS
    // sort receives a comparator
    shuffledAnswers.sort(() => Math.random() - 0.5);

    function handleSelectQuestion(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectQuestion(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}