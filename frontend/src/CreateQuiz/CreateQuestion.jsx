import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import OptionForm from "./OptionForm";
import { useParams } from "react-router-dom";
import useCreateQuestion from "../Hooks/useCreateQuestion";

const CreateQuizQuestion = () => {
  const { quizId } = useParams();
  const { isLoading, createQuestion } = useCreateQuestion(quizId);
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      questions: [
        { questionText: "", options: [{ text: "", isCorrect: false }] },
      ],
    },
  });

  const { fields: questions, append } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({ questionText: "", options: [{ text: "", isCorrect: false }] });
  };

  const onSubmit = (data) => {
    createQuestion(data.questions);
    console.log("Questions submitted:", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="mb-4">
            <label className="form-label">Question #{questionIndex + 1}</label>
            <input
              type="text"
              className="form-control mb-3"
              {...register(`questions.${questionIndex}.questionText`, {
                required: true,
              })}
              placeholder="Enter question"
            />

            <OptionForm
              questionIndex={questionIndex}
              control={control}
              register={register}
            />
          </div>
        ))}

        <button
          type="button"
          className="btn-secondary btn-sm mb-3"
          onClick={handleAddQuestion}
        >
          Add More Question
        </button>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          Submit Questions
        </button>
      </form>
    </div>
  );
};

export default CreateQuizQuestion;
