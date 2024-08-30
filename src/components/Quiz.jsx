import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from "./Question.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState(''); // state used to flag the answer status ('' = not responded, 'answered' = answer selected, etc.)

    // It's a good practice to manage as less amount of state values as possible
    // That's why it's better to derive computed values when possible
    // if answerState is not '', that menas the answer has  been selected so the active question remains to the last one already answered
    const currentQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const isQuizComplete = currentQuestionIndex === QUESTIONS.length;

    // We need to wrap the handle answer selection functions to be used as onTimeout prop by QuestionTimer
    const handleSelectAnswer = useCallback(function handleSelectQuestion(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        // after one second the selected answer is marked as answered, and after other second, it's marked as correct ot wrong accordingly
        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[currentQuestionIndex].answers[0]){
                setAnswerState('correct');
            }
            else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 1000);
        }, 1000);
    }, [currentQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(isQuizComplete){
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
                {/* This component is used as trick to rerender the question text and answers only when the active question index changes by using the key prop */}
                {/* Note that using the same key for more than one sibling component is not allowed by react */}
                <Question 
                    key={currentQuestionIndex}
                    questionText={QUESTIONS[currentQuestionIndex].text}
                    answers={QUESTIONS[currentQuestionIndex].answers}
                    answerState={answerState}
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    onSelectAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}/>
        </div>
    );

}