import { useState } from "react";

import QUESTIONS from '../questions.js'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const currentQuestionIndex = userAnswers.length;

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
                    {QUESTIONS[currentQuestionIndex].answers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectQuestion(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}