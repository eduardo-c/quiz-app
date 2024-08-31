import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    // getting rid of userState state management from QUiz component so that Question component takes care of it and we don't need to pass it as prop

    // It's a good practice to manage as less amount of state values as possible
    // That's why it's better to derive computed values when possible
    // if answerState is not '', that menas the answer has  been selected so the active question remains to the last one already answered
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
            <Summary userAnswers={userAnswers} />
        );
    }

    return (
        <div id="quiz">
                {/* This component is used as trick to rerender the question text and answers only when the active question index changes by using the key prop */}
                {/* Note that using the same key for more than one sibling component is not allowed by react */}
                {/* We get rid of many props as now Question manages more state logic and we avoid moving state down */}
                <Question 
                    key={currentQuestionIndex}
                    index={currentQuestionIndex}// key prop can be only used by react, so we need to pass this prop despite it has the same value than key
                    onSelectAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}/>
        </div>
    );

}