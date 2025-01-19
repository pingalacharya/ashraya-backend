const app = require('./index');
const loginRouter = require('./routes/loginRouter');

require('dotenv').config();

//Connection to database
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

//Routers
app.use('/api/users/login', loginRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
