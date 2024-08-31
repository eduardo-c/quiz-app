import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'

export default function Summary({userAnswers}) {

    // Computing the percentage of skipped, correct and wrong answers
    const skippedAnswersCount = userAnswers.filter((answer) => answer === null).length;
    const correctAnswersCount = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length;

    const skippedPerc = Math.round((skippedAnswersCount / userAnswers.length) * 100);
    const correctPerc = Math.round((correctAnswersCount / userAnswers.length) * 100);
    const wrongPerc = 100 - skippedPerc - correctPerc;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy Icon" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedPerc}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctPerc}%</span>
                    <span className="text">Answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongPerc}%</span>
                    <span className="text">Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = "user-answer";

                    if(answer === null){
                        cssClass += " skipped";
                    }
                    else if(answer === QUESTIONS[index].answers[0]){
                        cssClass += " correct";
                    }
                    else {
                        cssClass += " wrong";
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            {/* Displaying answer or Skipped is answer is null */}
                            <p className={cssClass}>{answer ?? "Skipped"}</p>
                        </li>   
                    );
                })}
            </ol>
        </div>
    );
}