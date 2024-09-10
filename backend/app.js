const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const connectDB = require('./database/db')
const adminRoutes = require('./routes/adminAuth');
const userRoutes = require('./routes/userAuth');
const productRoutes = require('./routes/productManagement');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes)

connectDB();
const port = process.env.PORT||3000;
 app.listen(port,() =>
  console.log(`SmartStore is listening on ${port}`)
 )

 