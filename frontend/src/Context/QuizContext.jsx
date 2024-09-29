import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "", isCorrect: false }] },
  ]);

  return (
    <QuizContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        isPublic,
        setIsPublic,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        questions,
        setQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);