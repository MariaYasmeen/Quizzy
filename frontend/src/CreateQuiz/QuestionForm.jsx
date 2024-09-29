import React from "react";
import { useQuiz } from "../Context/QuizContext";
import OptionForm from "./OptionForm";

const QuestionForm = () => {
  const { questions, setQuestions } = useQuiz();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: [{ text: "", isCorrect: false }] },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <label className="form-label">
            Question #{questionIndex + 1}
          </label>
          <input
            type="text"
            className="form-control mb-3"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            placeholder="Enter question"
            required
          />

          <OptionForm questionIndex={questionIndex} />

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleAddQuestion}
          >
            Add More Question
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionForm;