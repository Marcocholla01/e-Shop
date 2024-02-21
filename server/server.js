const app = require(`./app`);
const connectDatabase = require("./db/database");


// Handle Uncaught Exception
process.on(`uncaughtException`, (error) => {
  console.log(`ERROR: ${error.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
// Database Connection
 connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on(`unhandledRejection`, (error) => {
  console.log(`shutting down the server for ${error.message}`);
  console.log(`shutting down the server for unhandled promise rejection`);

  // then close the server
  server.close(() => {
    process.exit(1);
  });
});
