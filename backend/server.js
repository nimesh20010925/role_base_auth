const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');

connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
