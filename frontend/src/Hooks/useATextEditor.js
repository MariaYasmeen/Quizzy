import { useState } from "react";

export const useTextEditor = () => {
  const [title, setTitle] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [description, setDescription] = useState("");
  const [isCodeMode, setIsCodeMode] = useState(false);

  const toggleCodeMode = () => {
    setIsCodeMode((prev) => !prev);
    setDescription((prev) =>
      isCodeMode ? prev.replace(/\n```\n$/, "") : prev + "\n```\n"
    );
  };

  const resetForm = () => {
    setTitle("");
    setAnswerText("");
    setDescription("");
    setIsCodeMode(false);
  };

  return {
    title,
    answerText,
    description,
    setAnswerText,
    setDescription,
    setTitle,
    resetForm,
    isCodeMode,
    toggleCodeMode,
  };
};
