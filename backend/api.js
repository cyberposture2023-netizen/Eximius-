const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
// Use environment variable for port or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes ---

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy' });
});

// --- Server Startup ---
// We are intentionally leaving out the console.log to avoid the file corruption.
app.listen(PORT);