// Import all dependencies of the project
require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./db/connection.js');
const { applyBodyParser, applyCors } = require('./middleware/index.js');

// Initialize Express application instance
const app = express();

// Connect to the database
dbConnect(); 

// Apply middlewares
applyBodyParser(app);
applyCors(app);

// Import routes
const userRoutes = require('./routes/userRoutes.js');
const videoRoutes = require('./routes/videoRoutes.js');
const userRestrictedRoutes = require('./routes/restrictedUserRoutes.js');

// Implements routes
app.use('/tubekids', userRoutes);
app.use('/tubekids', videoRoutes);
app.use('/tubekids', userRestrictedRoutes);

// Listen on port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`TubeKids Rest Api listening on port ${PORT}!`));