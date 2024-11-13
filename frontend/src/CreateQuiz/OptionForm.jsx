import React from "react";
import { useQuiz } from "../Context/QuizContext";
import { handleAddOption, handleOptionChange, setCorrectAnswer } from "../services/HandlerUtils";

const OptionForm = ({ questionIndex }) => {
  const { questions, setQuestions } = useQuiz();

   if (!questions[questionIndex] || !questions[questionIndex].options) {
    return null;
  }

  return (
    <div>
      {questions[questionIndex].options.map((option, optionIndex) => (
        <div className="row mb-2" key={optionIndex}>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control inputfeild"
              value={option.text}
              onChange={(e) =>
                handleOptionChange(questions, setQuestions, questionIndex, optionIndex, e.target.value)
              }
              placeholder={`Option ${String.fromCharCode(97 + optionIndex)}`} 
              required
            />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <input
              type="radio"
              className="form-check-input inputfeild"
              name={`correctOption${questionIndex}`}
              checked={option.isCorrect}
              onChange={() => setCorrectAnswer(questions, setQuestions, questionIndex, optionIndex)}
            />
            <label className="form-check-label ms-2">Correct</label>
          </div>
        </div>
      ))}

      <button
        type="button"
        className=" btn-secondary btn-sm"
        onClick={() => handleAddOption(questions, setQuestions, questionIndex)}
      >
        Add More Option
      </button>
    </div>
  );
};

export default OptionForm;
