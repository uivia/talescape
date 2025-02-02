// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import the new HomePage component
import Register from './loginregistercomponents/Register';
import LoginForm from './loginregistercomponents/LoginForm';
import Saved from './Pages/Saved';
import Archive from './Pages/Archive';
import ContinueReading from './Pages/ContinueReading';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} /> {/* Route to HomePage */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/continue-reading" element={<ContinueReading />} />
        {/* You can add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;