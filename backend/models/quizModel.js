import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  participants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
    // validate: {
    //   validator: function(val) {
    //     return this.isPublic;
    //   },
    //   message: 'The participant field is required'
    // }
  },
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
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
