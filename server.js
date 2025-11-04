const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;
const DB_PATH = './app.db';

// --- DATABASE SETUP ---
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // CREATE TABLE using a template literal (backticks )
    db.run(\CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE
    )\, (err) => { // Added callback for error logging
        if (err) {
            console.error('Table creation error:', err.message);
        } else {
            // Optional: Log success
            console.log('Users table checked/created.');
        }
    });
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js Backend is healthy', db_file: DB_PATH });
});

// Start the Server
app.listen(PORT, () => {
  console.log(\Server running on http://localhost:\);
});
