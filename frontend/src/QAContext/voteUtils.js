 import { addVoteToQ , addVoteToA} from "../services/Q&APOST";

export const handleQuestionVoteClick = async (
  questionId,
  votedQuestions,
  setVotedQuestions,
  setQaData
) => {
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


export const handleAnswerVoteClick = async (
  answerId,
  questionId,
  votedAnswers,
  setVotedAnswers,
  setQuestionData
) => {
  const hasVoted = votedAnswers[answerId];
  const newVoteState = !hasVoted;

   const data = {
    vote: newVoteState ? 1 : -1,  
  };

   const updateAnswers = (prevData) =>
    prevData.answers.map((answer) =>
      answer._id === answerId
        ? { ...answer, votes: answer.votes + (newVoteState ? 1 : -1) }
        : answer
    );

   setVotedAnswers((prevState) => ({
    ...prevState,
    [answerId]: newVoteState,
  }));

  setQuestionData((prevData) => ({
    ...prevData,
    answers: updateAnswers(prevData),
  }));

  try {
     await addVoteToA({
      data,
      id: answerId,
      questionId,
    });
  } catch (error) {
     console.error("Failed to update vote:", error);

     setVotedAnswers((prevState) => ({
      ...prevState,
      [answerId]: hasVoted,
    }));

     setQuestionData((prevData) => ({
      ...prevData,
      answers: updateAnswers(prevData).map((answer) =>
        answer._id === answerId
          ? { ...answer, votes: answer.votes - (newVoteState ? 1 : -1) }
          : answer
      ),
    }));
  }
};
