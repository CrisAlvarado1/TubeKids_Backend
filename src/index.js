// Import all dependencies of the project
require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./db/index');
const { applyMiddleware } = require('./middleware/index');

// Initialize Express application instance
const app = express();

// Connect to the database
dbConnect();

// Apply middlewares
applyMiddleware(app);

// Listen on port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`TubeKids Rest Api listening on port ${PORT}!`));