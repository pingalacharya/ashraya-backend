require('dotenv').config();
const app = require('./index');
const loginRouter = require('./routes/loginRouter');
const sequelize = require('./db'); // Reuse Sequelize instance from db.js
const User = require('./Models/user.model');

// Function to initialize the User table
async function initializeTable() {
  try {
    await User.sync();
    console.log('User table initialized (no data inserted).');
  } catch (error) {
    console.error('Error initializing table:', error);
  }
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    initializeTable();
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

// Routers
app.use('/api/users/login', loginRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
