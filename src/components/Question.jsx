import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
    return (
        <div id="question">
            <QuestionTimer 
                // This is a trick using key prop used by react in lists, but it's used in this comp to force the re-render
                // of this component when the state of Quiz change.
                // QuestionTimer wouldn't be re-rendered because its props are always the same, so by setting the key prop to the index value, we ensure this component gets refreshed with the proper max
                    timeout={10000} 
                    onTimeout={onSkipAnswer} />
            <h2>{questionText}</h2>
            <Answers 
                answers={answers}
                onSelect={onSelectAnswer}
                selectedAnswer={selectedAnswer}
                answerState={answerState}/>
        </div>
    );
}