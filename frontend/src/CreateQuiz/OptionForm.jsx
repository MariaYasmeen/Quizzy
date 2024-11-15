import React from "react";
import { useFieldArray } from "react-hook-form";

const OptionForm = ({ questionIndex, control, register }) => {
  const { fields: options, append } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`, // Manage options inside the specific question
  });

  // Handle option change for the correct answer
  const handleCorrectOptionChange = (optionIndex) => {
    // Uncheck all options first
    options.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });
  };

  return (
    <div>
      {options.map((option, optionIndex) => (
        <div className="row mb-2" key={option.id}>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control inputfeild"
              {...register(`questions.${questionIndex}.options.${optionIndex}.text`, {
                required: true,
              })}
              placeholder={`Option ${String.fromCharCode(97 + optionIndex)}`}
              defaultValue={option.text}
            />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <input
              type="radio"
              className="form-check-input inputfeild"
              name={`questions.${questionIndex}.correctOption`} // Ensure that only one option is selected per question
              value={optionIndex} // This makes sure only one option is selected
              checked={option.isCorrect} // Make the correct option checked
              {...register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)} // Ensure the form state is updated
              onChange={() => handleCorrectOptionChange(optionIndex)} // Handle the correct answer change
            />
            <label className="form-check-label ms-2">Correct</label>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn-secondary btn-sm"
        onClick={() => append({ text: "", isCorrect: false })}
      >
        Add More Option
      </button>
    </div>
  );
};

export default OptionForm;
