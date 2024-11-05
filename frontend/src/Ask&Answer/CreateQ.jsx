import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestion } from "../services/Q&APOST"; 

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    description: "",
    questionDocument: null,
  });
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      questionDocument: e.target.files[0],
    });
  };

  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newTag = e.target.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    const data = new FormData();
    console.log(tags);
    data.append("questionText", formData.questionText);
    data.append("tags", JSON.stringify(tags));
    data.append("description", formData.description);

    if (formData.questionDocument) {
      data.append("questionDocument", formData.questionDocument);
    }

    try {
      const response = await createQuestion(data);
      setMessage("Question submitted successfully!");
      console.log("Question created successfully:", response);
      setLoading(false);
      setFormData({
        questionText: "",
        description: "",
        questionDocument: null,
      });
      setTags([]);
      navigate("/questions");
    } catch (err) {
      setError("Failed to submit the question.");
      console.error("Error creating question:", err);
      setLoading(false);
    }
  };

  return (
    <> 
         <main className="flex-grow-1 overflow-auto"  >

      <div className="container my-4">
        <h2 className="text-center mb-4">Ask a Question</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
              describe
              your
              placeholder="Type your description here"
              question
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
              placeholder="upload a image"
              type="file"
              className="form-control inputfeild"
              id="questionDocument"
              name="questionDocument"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
      </main>
    </>
  );
};

export default CreateQuestion;
