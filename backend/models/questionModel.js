const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true/false'],
    default: 'multiple-choice',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// ADD DIFFICULTY OF QUESTION [EASY , MEDIUM , HARD]
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
