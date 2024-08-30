import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        // Note that we need to move this derived state array to avoid accessing invalid indexes when the quiz is complete
        // Shuffling the answers to have a different orfder every time the component gets loaded
        shuffledAnswers.current = [...answers];
        // sort modifies the order of the array in place, for that reason we had to create a copy from QUESTIONS
        // sort receives a comparator
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
                    {shuffledAnswers.current.map(answer => {
                        const isSelected = answer === selectedAnswer
                        let cssClass = '';

                        if(answerState === 'answered' && isSelected){
                            cssClass = 'selected';
                        }

                        if((answerState === 'correct' || answerState  === 'wrong') && isSelected){
                            cssClass = answerState;
                        }

                        return (
                            <li key={answer} className="answer">
                                <button 
                                    className={cssClass}
                                    onClick={() => onSelect(answer)}>
                                        {answer}
                                </button>
                            </li>    
                        );
                    })}
        </ul>
    );
}