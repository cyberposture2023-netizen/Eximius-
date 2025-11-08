const express = require('express');
const cors = require('cors');
const portfinder = require('portfinder');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// --- Load Config ---
dotenv.config(); // Loads variables from .env file
connectDB(); // Initialize database connection

const app = express();

// === Route Imports ===
const exceptionRoutes = require('./routes/exceptionRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// === API Routes ===
app.use('/api/exceptions', exceptionRoutes); // for parsing application/json

// ---
// API Routes
// ---

// Basic Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// ---
// Start Server with Port Conflict Handling (Rule 6)
// ---
// (Rest of the file is unchanged)
const defaultPort = 5000;
const portToUse = process.env.PORT ? parseInt(process.env.PORT) : null;

if (portToUse) {
    // Fixed port logic
    app.listen(portToUse, () => {
        console.log(Server running on port 5000);
    });
} else {
    // Port-finding logic
    portfinder.setBasePort(defaultPort);
    portfinder.getPort((err, port) => {
        if (err) {
            console.error("Error finding a free port:", err);
            process.exit(1);
        }
        
        if (port !== defaultPort) {
            console.log(Default port  is busy. Starting on port .);
        }

        app.listen(port, () => {
            console.log(Server successfully started on port );
        });
    });
}


