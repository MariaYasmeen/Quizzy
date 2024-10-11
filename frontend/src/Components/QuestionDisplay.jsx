// QuestionDisplay.js
import React from 'react';
const QuestionDisplay = ({ question, userAnswers, setUserAnswers, currentQuestionIndex, markedForReview, toggleMarkForReview }) => {
  return (
    <div>
      <h6 className="question-number questions">
        Q: {currentQuestionIndex + 1} {question.questionText}
      </h6>
      <div className="options-container">
        {question.options.map((option, index) => (
          <label key={option._id} className="option-label">
            <input
              type="radio"
              name={question._id}
              value={option._id}
              onChange={() => setUserAnswers({ ...userAnswers, [question._id]: option._id })}
              checked={userAnswers[question._id] === option._id}
            />
            <span className="option-text">{String.fromCharCode(97 + index)}) {option.text}</span>
          </label>
        ))}
      </div>

      <div className="form-check mark-for-review my-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={markedForReview[question._id] || false}
          onChange={() => toggleMarkForReview(question._id)}  
        />
        <label className="form-check-label" style={{ fontSize: "13px" }}>
          Mark for Review
        </label>
      </div>
    </div>
  );
};

export default QuestionDisplay;
