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

// Body Parser Middleware
app.use(express.json());

// === API Routes ===
app.use('/api/exceptions', exceptionRoutes);

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
    // This is the 100% correct line
    console.log(`Server running on port ${port}`);
  });
});
