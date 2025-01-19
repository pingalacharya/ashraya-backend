const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login and generate token
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
