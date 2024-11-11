import React from 'react';

import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reset from "./pages/Reset";
import GoogleSignUp from "./pages/GoogleSignUp";
import { Routes, Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import Discussion from './pages/Discussion';
import DiscussionPage from './components/DiscussionPage';
import QuizPage from './components/QuizPage';
import AdminDashboard from './pages/AdminDashboard.js';
import AddModule from './components/AddModule.js';
import AdmDiscussion from './pages/AdmDiscussion';
import AdmDiscussionPage from './components/AdmDiscussionPage.js';
import Content from './components/Content.js';
import AdmQuizzes from './pages/AdmQuizzes.js';
import AddQuiz from './components/AddQuiz.js';
import Progress from './pages/Progress.js';
import QuizProgress from './components/QuizProgress.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/GoogleSignUp" element={<GoogleSignUp />} />
          <Route path="/Main" element={<MainLayout />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Discussion" element={<Discussion />} />
            <Route path="DiscussionPage" element={<DiscussionPage />} />
            <Route path="QuizPage" element={<QuizPage />} />
            <Route path="Dashboard/Content" element={<Content />} />
          </Route> 
          <Route path="/Admin" element={<AdminLayout />}>
            <Route path="Dashboard" element={<AdminDashboard />} />
            <Route path="Dashboard/AddModule" element={<AddModule />} />
            <Route path="Quizzes" element={<AdmQuizzes />} />
            <Route path="QuizPage" element={<QuizPage />} />
            <Route path="AddQuiz" element={<AddQuiz />} />
            <Route path="QuizProgress" element={<QuizProgress />} />
            <Route path="Discussion" element={<AdmDiscussion />} />
            <Route path="DiscussionPage" element={<AdmDiscussionPage />} />
            <Route path="Dashboard/Content" element={<Content />} />
            <Route path="Progress" element={<Progress />} />
          </Route>
      </Routes>
    </>
  );
}

export default App;

