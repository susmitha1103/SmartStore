const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
})
  

module.exports = mongoose.model('USER', userSchema);