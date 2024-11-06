import { useState } from "react";

export const useForm = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    description: "",
    questionDocument: null,
  });
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e, createQuestion, navigate) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    const data = new FormData();
    data.append("questionText", formData.questionText);
    data.append("tags", JSON.stringify(tags));
    data.append("description", formData.description);

    if (formData.questionDocument) {
      data.append("questionDocument", formData.questionDocument);
    }

    try {
      const response = await createQuestion(data);
      setMessage("Question submitted successfully!");
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
      setLoading(false);
    }
  };

  return {
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
  };
};
