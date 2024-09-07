import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Reset from "./pages/Reset";
import GoogleSignUp from "./pages/GoogleSignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/Login" element={<Login />} />
           <Route path="/Signup" element={<Signup />} />
           <Route path="/Reset" element={<Reset />} />
           <Route path="/GoogleSignUp" element={<GoogleSignUp />} />
           <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
