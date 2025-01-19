const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = require('../index');
app.use(cookieParser());

const options = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
};

module.exports = options;
