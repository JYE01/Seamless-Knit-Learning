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
import IntroToKnit from './learning/IntroToKnit';
import KnitSample from './learning/KnitSample';
import KnitToMeasure from './learning/KnitToMeasure';
import Edges from './learning/Edges';
import Garment from './learning/Garment';
import Mounting from './learning/Mounting';
import OtherGarments from './learning/OtherGarments';
import BabyKnit from './learning/BabyKnit';
import PatternKnit from './learning/PatternKnit';
import ProbKnit from './learning/ProbKnit';
import ExamplePattern from './learning/ExamplePattern'; 

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
              <Route path="/Main/IntroToKnit" element={<IntroToKnit />} />
              <Route path="/Main/KnitSample" element={<KnitSample />} />
              <Route path="/Main/KnitToMeasure" element={<KnitToMeasure />} />
              <Route path="/Main/Edges" element={<Edges />} />
              <Route path="/Main/Garment" element={<Garment />} />
              <Route path="/Main/Mounting" element={<Mounting />} />
              <Route path="/Main/OtherGarments" element={<OtherGarments />} />
              <Route path="/Main/BabyKnit" element={<BabyKnit />} />
              <Route path="/Main/PatternKnit" element={<PatternKnit />} />
              <Route path="/Main/ProbKnit" element={<ProbKnit />} />
              <Route path="/Main/ExamplePattern" element={<ExamplePattern />} />
            </Route> 
      </Routes>
    </>
  );
}

export default App;
