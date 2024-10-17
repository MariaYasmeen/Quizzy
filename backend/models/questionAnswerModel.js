import mongoose from 'mongoose';

const questionAnswerSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  votedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  answers: [
    {
      answerText: String,
      answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      votes: {
        type: Number,
        default: 0
      },
      votedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isResolved: {
    type: Boolean,
    default: false
  }
});

const QuestionAnswer = mongoose.model('QuestionAnswer', questionAnswerSchema);

export default QuestionAnswer;
