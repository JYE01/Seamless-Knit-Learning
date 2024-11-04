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
            <Route path="/Main/Dashboard" element={<Dashboard />} />
            <Route path="/Main/Quizzes" element={<Quizzes />} />
            <Route path="/Main/Discussion" element={<Discussion />} />
            <Route path="/Main/DiscussionPage" element={<DiscussionPage />} />
            <Route path="/Main/QuizPage" element={<QuizPage />} />
            <Route path="/Main/Dashboard/Content" element={<Content />} />
          </Route> 
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminDashboard/AddModule" element={<AddModule />} />
          <Route path="/AdminQuizzes" element={<AdmQuizzes />} />
          <Route path="/AdminQuizPage" element={<QuizPage />} />
          <Route path="/AdminAddQuiz" element={<AddQuiz />} />
          <Route path="/AdminDiscussion" element={<AdmDiscussion />} />
          <Route path="/AdminDiscussionPage" element={<AdmDiscussionPage />} />
          <Route path="/AdminDashboard/Content" element={<Content />} />
          <Route path="/AdminProgress" element={<Progress />} />
      </Routes>
    </>
  );
}

export default App;
