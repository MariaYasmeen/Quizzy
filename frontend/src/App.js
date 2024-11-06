import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./Pages/Hero";
import RegisterV1 from "./Account/RegisterV1";
import Signin from "./Account/Signin";
import CreateQuizQuestion from "./CreateQuiz/CreateQuestion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QAProvider } from "./QAContext/QAContext";
import { QuizProvider } from "./Context/QuizContext";
import { UserProvider } from "./Context/userContext";
import PublicQuizzes from "./Pages/PublicQuizzes";
import CreateQuiz from "./Pages/CreateQuiz";
import CreateQuestion from "./Ask&Answer/CreateQ";
import QuizDetails from "./Pages/QuizDetails";
import Dashboard from "./Dashboard/Home";
import AllQA from "./Ask&Answer/AllQs";
import QuizList from "./Dashboard/QuizList";
 import QDetails from "./Ask&Answer/QDetails";
import UpdateQuizForm from "./Pages/UpdateQuiz";
import UserHome from "./Pages/UserHome";
import QuizResults from "./Pages/QuizResults";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <QuizProvider>
            <QAProvider>
              <BrowserRouter>
                <Navbar />
                <Sidebar />
                <div style={{ marginLeft: '180px', padding: '20px' }}>
                   <Routes>
                    <Route path="/" element={<Hero />} />
                     <Route path="/updateQuizForm" element={<UpdateQuizForm />} />
                    <Route path="/home" element={<UserHome />} />
                    <Route path="/quizresults" element={<QuizResults />} />
                    <Route path="/createquestion" element={<CreateQuestion />} />
                    <Route path="/questions/:questionId/:title" element={<QDetails />} />
                    <Route path="/communityquestions" element={<AllQA />} />
                    <Route path="/dashboard/home" element={<Dashboard />} />
                    <Route path="/dashboard/allquizzes" element={<QuizList />} />
                    <Route path="/publicquizzes" element={<PublicQuizzes />} />
                    <Route path="/quiz/:quizId" element={<QuizDetails />} />
                    <Route path="/account/register2" element={<RegisterV1 />} />
                    <Route path="/account/signin" element={<Signin />} />
                    <Route path="/createquiz" element={<CreateQuiz />} />
                    <Route path="/createquiz/:quizId" element={<CreateQuizQuestion />} />
                   </Routes>
                </div>
              </BrowserRouter>
            </QAProvider>
          </QuizProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
