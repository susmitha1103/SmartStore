const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

const adminAuthentication = (req,res, next) =>{
  const token = req.header('Authorization').replace('Bearer ', '');
  if(!token){
    return res.status(401).json({msg:'No token, authorization denied'});
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded || !decoded.isAdmin){
      return res.status(401).json({msg: 'Admin resource, access denied'});
    }
    req.user = decoded;
    next();
  }
  catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
;}

module.exports = adminAuthentication;

