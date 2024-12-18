import mongoose from 'mongoose';

const questionAnswerSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionDocument: [String],
  tags: [String],
  description: {
    type: String,
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  votedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  view: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      answerText: String,
      answerDocument: [String],
      description: String,
      answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      votes: {
        type: Number,
        default: 0,
      },
      votedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
});
questionAnswerSchema.index({ votes: -1 });
const QuestionAnswer = mongoose.model('QuestionAnswer', questionAnswerSchema);

export default QuestionAnswer;
