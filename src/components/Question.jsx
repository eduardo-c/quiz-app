import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from '../questions.js'

export default function Question({
    index,
    onSelectAnswer, 
    onSkipAnswer}) {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 1000);
        } , 1000);
    }

    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
    else if (answer.selectedAnswer) {
        answerState = 'answered'
    }

    return (
        <div id="question">
            <QuestionTimer 
                // This is a trick using key prop used by react in lists, but it's used in this comp to force the re-render
                // of this component when the state of Quiz change.
                // QuestionTimer wouldn't be re-rendered because its props are always the same, so by setting the key prop to the index value, we ensure this component gets refreshed with the proper max
                    timeout={10000} 
                    onTimeout={onSkipAnswer} />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers 
                answers={QUESTIONS[index].answers}
                onSelect={handleSelectAnswer}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}/>
        </div>
    );
}