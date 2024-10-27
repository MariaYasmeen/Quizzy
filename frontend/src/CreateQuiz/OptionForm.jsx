import React from "react";
import { useQuiz } from "../Context/QuizContext";

const OptionForm = ({ questionIndex }) => {
  const { questions, setQuestions } = useQuiz();

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options[optionIndex].text = value;
      setQuestions(newQuestions);
    }
  };

  const setCorrectAnswer = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options = newQuestions[questionIndex].options.map(
        (option, i) => ({ ...option, isCorrect: i === optionIndex })
      );
      setQuestions(newQuestions);
    }
  };

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
                handleOptionChange(questionIndex, optionIndex, e.target.value)
              }
              placeholder={`Option ${String.fromCharCode(97 + optionIndex)}`} // a, b, c, ...
              required
            />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <input
              type="radio"
              className="form-check-input inputfeild"
              name={`correctOption${questionIndex}`}
              checked={option.isCorrect}
              onChange={() => setCorrectAnswer(questionIndex, optionIndex)}
            />
            <label className="form-check-label ms-2">Correct</label>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => handleAddOption(questionIndex)}
      >
        Add More Option
      </button>
    </div>
  );
};

export default OptionForm;