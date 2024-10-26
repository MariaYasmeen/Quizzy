 import { addVoteToA } from "../services/Q&APOST";
import { fetchOneQuestion } from "../services/Q&AFETCH";

// Function to fetch question details


// Function to handle vote click
export const handleVoteClick = async (answerId, questionId, votedAnswers, setVotedAnswers, setQuestionData) => {
  const hasVoted = votedAnswers[answerId];
  const newVoteState = !hasVoted;

  try {
    const data = { vote: newVoteState ? 1 : -1 };
    await addVoteToA({ data, id: answerId, questionId });

    // Update local vote state
    setVotedAnswers((prevState) => ({
      ...prevState,
      [answerId]: newVoteState,
    }));

    // Update votes count locally
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
