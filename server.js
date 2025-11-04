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
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE)");
  }
});

// Middleware
app.use(express.json()); // ESSENTIAL for parsing POST body
app.use(cors());

// API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js Backend is healthy', db_file: DB_PATH });
});

// API Route: User Registration
app.post('/api/register', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Missing username or email' });
  }

  // Check for existing username or email before insertion
  db.get("SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?", [username, email], (err, row) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Internal database error' });
    }

    if (row.count > 0) {
      return res.status(409).json({ error: 'Username or email already taken' });
    }

    // Insert new user
    const stmt = db.prepare("INSERT INTO users (username, email) VALUES (?, ?)");
    stmt.run(username, email, function (err) {
      if (err) {
        console.error('Database insertion error:', err.message);
        return res.status(500).json({ error: 'Database insertion failed' });
      }
      res.status(201).json({ message: 'User registered successfully', id: this.lastID });
    });
    stmt.finalize();
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
