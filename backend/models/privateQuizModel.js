const mongoose = require('mongoose');

const privateQuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  participant: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

// quizSchema.pre(/^find/, function(next) {
//   this.find();
//   next();
// });

// ADD A DIFFICULTY FOR QUIZ
const PrivateQuiz = mongoose.model('PrivateQuiz', privateQuizSchema);

module.exports = PrivateQuiz;
