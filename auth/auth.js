const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const router = express.Router();

router.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE login = ?', [login], (error, results, fields) => {
    if (results.length > 0) {
      const user = results[0];

      if (password == user.password) {
        // Passwords match, create and send token
        const token = jwt.sign({ email: user.email }, 'asf', { expiresIn: '1h' });
        res.json({ token });
      } else {
        // Passwords do not match, send error response
        res.status(401).json({ error: 'Incorrect email and/or password' });
      }
    } else {
      // User does not exist, send error response
      res.status(401).json({ error: 'Incorrect email and/or password' });
    }
  });
});

router.post('/register', (req, res) => {
  const { login, password, email } = req.body;

  db.query('INSERT INTO users (login, password, email) VALUES (?, ?, ?)', [login, password, email], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to register user' });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;
