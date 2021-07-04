const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

const app = require('./app');

// Setting up config file
dotenv.config({ path: 'config/config.env' });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server Start on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
