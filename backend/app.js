import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import quizRouter from './routes/quizRoutes.js';
import questionAnswerRouter from './routes/questionAnswerRoutes.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();
app.use(json());
app.use(cookieParser());
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/qna', questionAnswerRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'there is no route like this',
  });
});

app.use(globalErrorHandler);
export default app;
