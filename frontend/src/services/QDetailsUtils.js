import { addVoteToA } from "../services/Q&APOST";

 
 export const handleVoteClick = async (
  answerId,
  questionId,
  votedAnswers,
  setVotedAnswers,
  setQuestionData
) => {
  const hasVoted = votedAnswers[answerId];
  const newVoteState = !hasVoted;

  try {
    const data = { vote: newVoteState ? 1 : -1 };
    await addVoteToA({ data, id: answerId, questionId });

     setVotedAnswers((prevState) => ({
      ...prevState,
      [answerId]: newVoteState,
    }));

     setQuestionData((prevData) => ({
      ...prevData,
      answers: prevData.answers.map((answer) =>
        answer._id === answerId
          ? {
              ...answer,
              votes: answer.votes + (newVoteState ? 1 : -1),
            }
          : answer
      ),
    }));
  } catch (error) {
    console.error("Failed to update votes:", error);
  }
};


