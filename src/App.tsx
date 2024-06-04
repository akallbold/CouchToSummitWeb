// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import useAuthentication from './hooks/useAuthentication';

function App() {
  const { isAuthenticated } = useAuthentication();

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
