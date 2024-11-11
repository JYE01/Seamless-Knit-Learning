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
import ProtectedRoute from './ProtectedRoute.js';

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
            <Route path="Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="Quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
            <Route path="Discussion" element={<ProtectedRoute><Discussion /></ProtectedRoute>} />
            <Route path="DiscussionPage" element={<ProtectedRoute><DiscussionPage /></ProtectedRoute>} />
            <Route path="QuizPage" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="Dashboard/Content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
          </Route> 
          <Route path="/Admin" element={<AdminLayout />}>
            <Route path="Dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="Dashboard/AddModule" element={<ProtectedRoute><AddModule /></ProtectedRoute>} />
            <Route path="Quizzes" element={<ProtectedRoute><AdmQuizzes /></ProtectedRoute>} />
            <Route path="QuizPage" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="AddQuiz" element={<ProtectedRoute><AddQuiz /></ProtectedRoute>} />
            <Route path="QuizProgress" element={<ProtectedRoute><QuizProgress /></ProtectedRoute>} />
            <Route path="Discussion" element={<ProtectedRoute><AdmDiscussion /></ProtectedRoute>} />
            <Route path="DiscussionPage" element={<ProtectedRoute><AdmDiscussionPage /></ProtectedRoute>} />
            <Route path="Dashboard/Content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
            <Route path="Progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          </Route>
      </Routes>
    </>
  );
}

export default App;

