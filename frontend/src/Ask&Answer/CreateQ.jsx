import React from "react";
import { useNavigate } from "react-router-dom";
import { createQuestion } from "../services/Q&APOST";
import { useForm } from "../Hooks/useQForm";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const {
    formData,
    tags,
    loading,
    message,
    error,
    handleChange,
    handleFileChange,
    handleTagChange,
    removeTag,
    handleSubmit,
  } = useForm();

  return (
    <main className="flex-grow-1 overflow-auto">
      <div className="container my-4">
        <h2 className="text-center mb-4">Ask a Question</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={(e) => handleSubmit(e, createQuestion, navigate)}>
          <div className="mb-1">
            <input
              placeholder="Title"
              type="text"
              className="form-control inputfeild"
              id="questionText"
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              className="form-control inputfeild"
              id="tags"
              onKeyDown={handleTagChange}
              placeholder="Add tags"
            />
            <div className="mt-1">
              {tags.map((tag, index) => (
                <span key={index} className="badge bg-info me-1">
                  {tag}
                  <button
                    type="button"
                    className="btn-close btn-close-white "
                    aria-label="Close"
                    onClick={() => removeTag(tag)}
                  ></button>
                </span>
              ))}
            </div>
          </div>
          <div className="mb-1">
            <textarea
              placeholder="Type your description here"
              className="form-control inputfeild"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Upload images"
              type="file"
              className="form-control inputfeild"
              id="questionDocument"
              name="questionDocument"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              multiple 
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateQuestion;
