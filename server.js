const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;
const DB_PATH = './app.db';
const saltRounds = 10;
const JWT_SECRET = 'YOUR_SUPER_SECRET_KEY';

// Middleware (for JWT token extraction)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: "Access Denied. Token required." });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token." }); 
        req.user = user; 
        next();
    });
};

// --- DATABASE SETUP (FINAL STABLE VERSION) ---
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Ensure USERS table exists 
    db.run("DROP TABLE IF EXISTS users"); 
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password_hash TEXT)");
    // Ensure NOTES table exists 
    db.run("DROP TABLE IF EXISTS notes");
    db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, content TEXT, FOREIGN KEY (user_id) REFERENCES users(id))");
  }
});

// Middleware
app.use(express.json()); 
app.use(cors());

// API Route: Health Check (Unprotected)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js Backend is healthy' });
});

// --- API Route: Secured Data Retrieval (GET /api/notes) ---
app.get('/api/notes', authenticateToken, (req, res) => {
    const user_id = req.user.id;
    
    db.all("SELECT id, content FROM notes WHERE user_id = ?", [user_id], (err, rows) => {
        if (err) {
            console.error('Database retrieval error:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve notes.' });
        }
        res.json({ notes: rows });
    });
});
// ----------------------------------------------------

// API Route: Protected Data Feature (POST /api/notes)
app.post('/api/notes', authenticateToken, (req, res) => {
  const user_id = req.user.id; 
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Note content is required.' });
  }

  const stmt = db.prepare("INSERT INTO notes (user_id, content) VALUES (?, ?)");
  stmt.run(user_id, content, function (err) {
    if (err) {
      console.error('Database insertion error:', err.message);
      return res.status(500).json({ error: 'Database insertion failed.' });
    }
    res.status(201).json({ message: 'Note saved successfully', note_id: this.lastID });
  });
  stmt.finalize();
});

// API Route: User Registration 
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing required fields' });
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    db.get("SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?", [username, email], (err, row) => {
      if (err) return res.status(500).json({ error: 'Internal database error during check' });
      if (row.count > 0) return res.status(409).json({ error: 'Username or email already taken' });

      const stmt = db.prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
      stmt.run(username, email, hash, function (err) {
        if (err) return res.status(500).json({ error: 'Database insertion failed' });
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

// API Route: User Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  db.get("SELECT id, username, password_hash FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Internal database error' });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (result) {
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
