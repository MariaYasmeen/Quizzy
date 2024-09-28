import React from "react";
import { useForm } from "react-hook-form";
import useCreateQuiz from "./useCreateQuiz";

const CreateQuizForm = () => {
  const { isLoading, createQuiz } = useCreateQuiz();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createQuiz(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-4">
        <label htmlFor="quizTitle">Quiz Title</label>
        <input
          type="text"
          className="form-control"
          id="quizTitle"
          placeholder="Enter quiz title"
          {...register("title")}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="quizDescription">Description</label>
        <textarea
          className="form-control"
          id="quizDescription"
          rows="3"
          placeholder="Enter quiz description"
          {...register("description")}
        />
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="isPublic"
          {...register(" isPublic")}
        />
        <label className="form-check-label" htmlFor="isPublic">
          Public Quiz
        </label>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            required
            {...register("startDate")}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            required
            {...register("endDate")}
          />
        </div>
      </div>
      <button>create</button>
    </form>
  );
};

export default CreateQuizForm;
