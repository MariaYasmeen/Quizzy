// src/contexts/QAContext.js
import React, { createContext, useEffect, useState } from "react";
import { fetchQuestions } from "../services/Q&AFETCH";
import { addVoteToQ } from "../services/Q&APOST";

export const QAContext = createContext();

export const QAProvider = ({ children }) => {
  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votedQuestions, setVotedQuestions] = useState({}); // Track votes for each question

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const data = await fetchQuestions();
        console.log("Fetched QA Data:", data);
        setQaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQA();
  }, []);

  const handleVoteClick = async (questionId) => {
    const hasVoted = votedQuestions[questionId];
    const newVoteState = !hasVoted;

    try {
      const data = { vote: newVoteState ? 1 : -1 };
      await addVoteToQ({ data, id: questionId });

      setVotedQuestions((prevState) => ({
        ...prevState,
        [questionId]: newVoteState,
      }));

      setQaData((prevData) =>
        prevData.map((qa) =>
          qa._id === questionId
            ? {
                ...qa,
                votes: qa.votes + (newVoteState ? 1 : -1),
              }
            : qa
        )
      );
    } catch (error) {
      console.error("Failed to update votes:", error);
    }
  };

  return (
    <QAContext.Provider
      value={{
        qaData,
        loading,
        error,
        votedQuestions,
        handleVoteClick,
      }}
    >
      {children}
    </QAContext.Provider>
  );
};
