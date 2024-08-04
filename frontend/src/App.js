import React,{useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignUp from './Components/Admin/AdminSignUp';
import Appbar from './Components/Appbar';
import AddProduct from './Components/Admin/AddProduct';

const App = () => {
  useEffect(() => {
    // Set the token from localStorage if it exists
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/signup" element={<AdminSignUp />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path ="/add-product" element ={<AddProduct/>}/>
      </Routes>
    </Router>
  );
};

export default App;
