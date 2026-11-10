require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');

// API routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Secure Authentication API is running');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
