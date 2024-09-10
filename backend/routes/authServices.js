const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const comparePasswords = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
};
module.exports = {
  hashPassword,
  comparePasswords,
  generateToken
};
