// src/App.js
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ActivityHistory from './components/ActivityHistory';
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
          <Route
            path="/history"
            element={!isAuthenticated ? <Login /> : <ActivityHistory />}
          />
          <Route
            path="/journey"
            element={!isAuthenticated ? <Login /> : <Journey />}
          />
          <Route
            path="/hikes"
            element={!isAuthenticated ? <Login /> : <Hikes />}
          />
          <Route
            path="/stairs"
            element={!isAuthenticated ? <Login /> : <Stairs />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<ActivityHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
