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
    enum: ['multiple-choice', 'true/false', 'short-answer'],
    default: 'multiple-choice',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
