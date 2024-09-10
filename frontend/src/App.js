import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminSignUp from './Components/Admin/AdminSignUp';
import Appbar from './Components/Appbar';
import AddProduct from './Components/Admin/AddProduct';
import UpdateProductDetails from './Components/Admin/UpdateProductDetails';
import ProductList from './Components/ProductList';
import DeleteProduct from './Components/DeleteProduct';
import AdminDashboard from './Components/AdminDashboard';
import ProductListing from './Components/ProductListing';


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

  return (
    <Router>
     <Appbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
     <Routes>
     <Route exact path="/products" component={ProductListing} />    
  <Route path="/signup" element={<AdminSignUp />} />
  <Route path="/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/add-product" element={isLoggedIn ? <AddProduct /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/update-product/:id" element={isLoggedIn ? <UpdateProductDetails /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/products" element={isLoggedIn ? <ProductList /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/delete-product" element={isLoggedIn ? <DeleteProduct /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/AdminDashboard" element={isLoggedIn ? <AdminDashboard /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path = "/view-products" element = {isLoggedIn ? <ProductListing/> : <AdminLogin setIsLoggedIn = {setIsLoggedIn} />} />
</Routes>

    </Router>
  );
};

export default App;
