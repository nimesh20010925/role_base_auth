const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

console.log('PORT from env:', process.env.PORT); // Debug log

const connectDB = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
