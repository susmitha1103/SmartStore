const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const connectDB = require('./database/db')
const adminRoutes = require('./routes/adminAuth');
const userRoutes = require('./routes/userAuth');
const addUpdateProductRoutes = require('./routes/productManagement/addUpdateProduct');
const deleteProductRoutes = require('./routes/productManagement/deleteProduct');
const fetchProductRoutes = require('./routes/productManagement/fetchProduct');
const filterProductRoutes = require('./routes/productManagement/filterProduct');
const categoryRoutes = require('./routes/productManagement/category');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.use('/api/products/addUpdate', addUpdateProductRoutes);
app.use('/api/products/delete', deleteProductRoutes);
app.use('/api/products/fetch', fetchProductRoutes);
app.use('/api/products/filter', filterProductRoutes);
app.use('/api/products/category', categoryRoutes);

connectDB();
const port = process.env.PORT||3000;
 app.listen(port,() =>
  console.log(`SmartStore is listening on ${port}`)
 )

 