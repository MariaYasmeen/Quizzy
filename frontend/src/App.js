import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./Pages/Hero";
import Register from "./Account/Register";
import RegisterV1 from "./Account/RegisterV1";
import Signin from "./Account/Signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizProvider } from "./Context/QuizContext";
import { UserProvider } from "./Context/userContext";
import CreateQuiz from "./Pages/CreateQuiz";
import CreateQuizV1 from "./features/quiz/CreateQuizV1";
const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <QuizProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/account/register2" element={<RegisterV1 />} />
                <Route path="/account/signin" element={<Signin />} />
                <Route path="/createquiz" element={<CreateQuiz />} />
                <Route path="/createquiz2" element={<CreateQuizV1 />} />
              </Routes>
            </BrowserRouter>
          </QuizProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
