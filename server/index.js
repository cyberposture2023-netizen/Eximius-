const express = require('express');
const cors = require('cors');
const portfinder = require('portfinder');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

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
const defaultPort = 5000;

// Use a fixed port if 'PORT' env var is set (for dev/proxy),
// otherwise use portfinder (for production/flexibility).
const portToUse = process.env.PORT ? parseInt(process.env.PORT) : null;

if (portToUse) {
    // Fixed port logic
    app.listen(portToUse, () => {
        console.log(Server successfully started on fixed port );
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
