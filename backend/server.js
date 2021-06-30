const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const { connect } = require('mongoose');
// Setting up config file

dotenv.config({ path: 'config/config.env' });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server Start on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
