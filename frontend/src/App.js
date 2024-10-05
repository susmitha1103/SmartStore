import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignUp from './Components/Admin/AdminSignUp';
import Appbar from './Components/Appbar';
import AddProduct from './Components/Products/AddProduct';
import ProductListing from './Components/Products/ProductListing';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Appbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/view-products" element={<ProtectedRoute element={<ProductListing />} />} />
        <Route path="/signup" element={<AdminSignUp />} />
        <Route path="/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/add-product" element={<ProtectedRoute element={<AddProduct />} />} />
      </Routes>
    </Router>
  );
};

export default App;
