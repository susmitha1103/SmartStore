const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const adminAuthentication = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  // Check if Authorization header is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No token provided or incorrect token",authHeader)
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract the token
  const token = authHeader.replace('Bearer ', '');
  console.log('Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the user is an admin
    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ msg: 'Admin resource, access denied' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = adminAuthentication;
