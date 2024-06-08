// src/App.js
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Activity from './components/Activity';
import useAuth from './hooks/useAuth';
import Hikes from './components/Hikes';
import { Settings } from './components/Settings';
import Journey from './components/Journey';
import Stairs from './components/Stairs';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/activity" element={<Activity />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/hikes" element={<Hikes />} />
          <Route path="/stairs" element={<Stairs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Activity />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
