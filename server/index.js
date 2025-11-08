const express = require('express');
const dotenv = require('dotenv');
const portfinder = require('portfinder');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// === Route Imports ===
const exceptionRoutes = require('./routes/exceptionRoutes');
const userRoutes = require('./routes/userRoutes'); // <-- The missing import

// Body Parser Middleware
app.use(express.json());

// === API Routes ===
app.use('/api/exceptions', exceptionRoutes);
app.use('/api/users', userRoutes); // <-- The missing route handler

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Port finding logic
const preferredPort = parseInt(process.env.PORT, 10) || 5000;
portfinder.basePort = preferredPort;

portfinder.getPort((err, port) => {
  if (err) {
    console.error('Error finding port:', err);
    process.exit(1);
  }

  if (port !== preferredPort) {
    console.warn(`Port ${preferredPort} is in use. Starting on port ${port}.`);
  }

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
