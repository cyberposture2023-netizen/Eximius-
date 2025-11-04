const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // NEW
const app = express();
const PORT = 5000;
const DB_PATH = './app.db';
const saltRounds = 10;
const JWT_SECRET = 'YOUR_SUPER_SECRET_KEY'; // IMPORTANT: Use a complex secret key in production

// --- DATABASE SETUP ---
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Drop and recreate the table to ensure password_hash field is fresh for bcrypt
    db.run("DROP TABLE IF EXISTS users");
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password_hash TEXT)");
  }
});

// Middleware
app.use(express.json()); 
app.use(cors());

// --- JWT Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expects: Bearer TOKEN

    if (token == null) return res.status(401).json({ error: "Access Denied. Token required." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Token is invalid or expired
            return res.status(403).json({ error: "Invalid or expired token." }); 
        }
        req.user = user; // user payload: { id, username }
        next();
    });
};

// API Route: Health Check (Unprotected)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js Backend is healthy', db_file: DB_PATH });
});

// API Route: Protected Example (NEW)
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ 
        message: 'Access granted to protected route.', 
        user: req.user.username,
        id: req.user.id
    });
});

// API Route: User Registration (Returns Token on Success)
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    db.get("SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?", [username, email], (err, row) => {
      if (err) return res.status(500).json({ error: 'Internal database error during check' });
      if (row.count > 0) return res.status(409).json({ error: 'Username or email already taken' });

      const stmt = db.prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
      stmt.run(username, email, hash, function (err) {
        if (err) {
          console.error('Database insertion error:', err.message);
          return res.status(500).json({ error: 'Database insertion failed' });
        }
        
        // Generate Token
        const token = jwt.sign({ id: this.lastID, username: username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token: token });
      });
      stmt.finalize();
    });
  } catch (error) {
    console.error('Bcrypt or general error:', error);
    return res.status(500).json({ error: 'Server processing error' });
  }
});

// API Route: User Login (Returns Token on Success)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  db.get("SELECT id, username, password_hash FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Internal database error' });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (result) {
        // Generate Token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token: token });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
