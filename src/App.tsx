// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import useAuthentication from './hooks/useAuthentication';
import Hikes from './components/Hikes';
import { Settings } from './components/Settings';

function App() {
  const { isAuthenticated } = useAuthentication();

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Login /> : <Home />} />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/hikes"
            element={!isAuthenticated ? <Login /> : <Hikes />}
          />
          <Route
            path="/settings"
            element={!isAuthenticated ? <Login /> : <Settings />}
          />
          {/* <Route
            path="/stairs"
            element={!isAuthenticated ? <Stairs /> : <Navigate to="/hikes" />}
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
