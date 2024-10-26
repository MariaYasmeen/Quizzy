// src/contexts/QAContext.js
import React, { createContext, useEffect, useState } from "react";
import { getQuestions } from "./getQuestions";
import { handleQuestionVoteClick } from "./voteUtils";

export const QAContext = createContext();

export const QAProvider = ({ children }) => {
  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votedQuestions, setVotedQuestions] = useState({});

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const data = await getQuestions();
        setQaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQA();
  }, []);

  return (
    <QAContext.Provider
      value={{
        qaData,
        loading,
        error,
        votedQuestions,
        handleVoteClick: (questionId) =>
          handleQuestionVoteClick(
            questionId,
            votedQuestions,
            setVotedQuestions,
            setQaData
          ),
      }}
    >
      {children}
    </QAContext.Provider>
  );
};
