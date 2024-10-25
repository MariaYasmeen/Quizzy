import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./Pages/Hero";
import RegisterV1 from "./Account/RegisterV1";
import Signin from "./Account/Signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizProvider } from "./Context/QuizContext";
import { UserProvider } from "./Context/userContext";
import PublicQuizzes from "./Pages/PublicQuizzes";
import CreateQuizPage from "./Pages/CreateQuizPage";
import CreateQuestion from "./Ask&Answer/CreateQ";
import QuizDetails from "./Pages/QuizDetails";
import Dashboard from "./Dashboard/Home";
import AllQA from "./Ask&Answer/AllQA";
import QuizList from "./Dashboard/QuizList";
import Questions from "./Ask&Answer/AskAndAnswer";
import QDetails from "./Ask&Answer/QDetails";
import MyQuestions from "./Ask&Answer/MyQ";
import { QAProvider } from "./QAContext/QAContext";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <QuizProvider>
          <QAProvider>

            <BrowserRouter>
              <Routes> 
                <Route path="/" element={<Hero />} />
                <Route path="/myquestions" element={<MyQuestions />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/createquestion" element={<CreateQuestion />} />
                <Route path="/questions/:questionId/:title" element={<QDetails />} />
                <Route path="/communityquestions" element={<AllQA />} />
                <Route path="/dashboard/home" element={<Dashboard />} />
                <Route path="/dashboard/allquizzes" element={<QuizList />} />
                <Route path="/publicquizzes" element={<PublicQuizzes />} />
                <Route path="/quiz/:quizId" element={<QuizDetails />} />
                <Route path="/account/register2" element={<RegisterV1 />} />
                <Route path="/account/signin" element={<Signin />} />
                <Route path="/createquizpage" element={<CreateQuizPage />} />
                <Route
                  path="/createquiz/:quizId"
                  element={<CreateQuestion />}
                />
                {/* <Route path="*" element={<p>404: Page Not Found</p>} /> */}
              </Routes>
            </BrowserRouter>
            </QAProvider>

          </QuizProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
