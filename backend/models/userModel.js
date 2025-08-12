const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager' ,'user' ], // Define roles
    //default: 'user', // Default role
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});   

module.exports = mongoose.model('User', userSchema);