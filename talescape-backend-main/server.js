const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing
const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "talescape_db"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const getUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(getUserQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    // ...existing code...
  });
});

// Example additional endpoints
app.get('/api/books', (req, res) => {
  const getBooksQuery = "SELECT * FROM books";
  db.query(getBooksQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(results);
  });
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const createUserQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(createUserQuery, [email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error creating user", error: err });
    }
    res.status(201).json({ message: "User created successfully" });
  });
});

app.listen(8081, () => {
  console.log('Server running on port 8081');
});