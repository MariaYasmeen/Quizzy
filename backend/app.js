const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const quizRouter = require('./routes/quizRoutes');
const questionAnswerRouter = require('./routes/questionAnswerRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/qna', questionAnswerRouter);
// app.use('/api/v1/', quizRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'there is no route like this'
  });
});

app.use(globalErrorHandler);
module.exports = app;
