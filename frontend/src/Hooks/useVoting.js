// src/hooks/useVoting.js

import { useContext } from 'react';
import { handleAnswerVoteClick } from '../QAContext/voteUtils';
import { UserContext } from '../Context/userContext';
import { addVoteToQ, addVoteToA } from "../services/Q&APOST";
 import { useCallback } from 'react';


export const useQuestionVote = (questionId, votedQuestions, setVotedQuestions, setQaData) => {
  const { user } = useContext(UserContext);

  const handleVoteClick = async () => {
    if (!user) {
      alert("Please sign in to vote.");
      return;
    }

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
            ? { ...qa, votes: qa.votes + (newVoteState ? 1 : -1) }
            : qa
        )
      );
    } catch (error) {
      console.error("Failed to update question votes:", error);
    }
  };

  return handleVoteClick;
};

 
export const useAnswerVote = (setVotedAnswers, setQuestionData, questionId) => {
  const handleVoteClick = useCallback(
    (answerId) => {
      handleAnswerVoteClick(
        answerId,
        questionId,
        setVotedAnswers,
        setQuestionData
      );
    },
    [questionId, setVotedAnswers, setQuestionData]
  );

  return { handleVoteClick };  
};
