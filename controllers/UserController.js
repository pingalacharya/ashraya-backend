const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('../Models/user.model');
const { generateToken, verifyToken } = require('../utils/AuthJWT');
const options = require('../utils/CookieMiddleware');

const app = require('../index');
app.use(cookieParser());

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  const username = email + '123';

  try {
    // Check if user already exists
    const singleUser = await User.findOne({ where: { email: email } });

    //password is hashed in user model before entering in database
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (!singleUser) {
      const newUser = await User.create({
        username,
        email,
        password: encryptedPassword,
      });

      //generate token for user and send it
      const token = generateToken(newUser);
      //newUser.password = undefined;

      res
        .status(200)
        .cookie('token', token, options)
        .json({
          status: 'ok',
          data: {
            message: 'New User Registered',
            user: newUser,
            token: token,
          },
        });
    } else {
      res.status(401).json({
        status: 'error',
        data: {
          message: 'Email Id in use, Bad Request',
          user: singleUser,
        },
      });
    }
  } catch (error) {
    res.status(501).json({
      status: 'error',
      data: {
        message: 'User not Created',
        error: error,
      },
    });
  }
};

// Login an existing user

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        data: {
          message: 'User Not Found',
        },
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.dataValues.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        data: {
          message: 'Invalid Credentials',
        },
      });
    }
    // Generate JWT token
    const token = generateToken(user);
    // Send the token as a response
    return res
      .status(200)
      .cookie('token', token, options)
      .json({
        status: 'ok',
        data: {
          message: 'Login Successful',
          user: user,
          token: token,
        },
      });
  } catch (err) {
    res.status(501).json({
      status: 'error',
      data: {
        message: 'Server Error',
        error: err,
      },
    });
  }
};

// Logout route
exports.logoutUser = async (req, res) => {
  res
    .status(200)
    .clearCookie('token')
    .json({
      status: 'ok',
      data: {
        message: 'Logout Successful',
      },
    });
};

// User authorization check

exports.authUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      data: {
        message: 'Access Denied. No Token Provided',
      },
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      status: 'error',
      data: {
        message: 'Invalid or Expired Token',
      },
    });
  }

  res.status(200).json({
    status: 'ok',
    data: {
      message: 'Access Granted',
    },
  });
};
