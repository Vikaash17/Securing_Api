const bcrypt = require('bcrypt');
const db = require('../config/db');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking whether email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // Basic password length validation
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must contain at least 8 characters',
      });
    }

    // Check whether user already exists
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Database error',
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            message: 'User already exists',
          });
        }

        // Generate password hash using bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        // Store hashed password in MySQL
        db.query(
          'INSERT INTO users (email, password_hash) VALUES (?, ?)',
          [email, hashedPassword],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: 'Registration failed',
              });
            }

            return res.status(201).json({
              message: 'User registered successfully',
              userId: result.insertId,
            });
          },
        );
      },
    );
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = { registerUser };
