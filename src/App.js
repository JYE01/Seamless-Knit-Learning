import React from 'react';

import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reset from "./pages/Reset";
import GoogleSignUp from "./pages/GoogleSignUp";
import { Routes, Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import Discussion from './pages/Discussion';
import Calendar from './pages/Calendar';

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
              <Route path="/Main/Calendar" element={<Calendar />} />
            </Route> 
      </Routes>
    </>
  );
}

export default App;
