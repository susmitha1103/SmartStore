import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignUp from './Components/Admin/AdminSignUp';
import Appbar from './Components/Appbar';

const App = () => {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/signup" element={<AdminSignUp />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
