// Import all dependencies of the project
require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./db/connection.js");
const { applyBodyParser, applyCors } = require("./middleware/index.js");

// Initialize Express application instance
const app = express();

// Connect to the database
dbConnect();

// Apply middlewares
applyBodyParser(app);
applyCors(app);

const { searchUserGet } = require("./controllers/userController.js");

// Import and implements routes for the user actions before middleware auth
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/tubekids", userRoutes);

// Login with JWT (Route)
const sessionRoutes = require("./routes/sessionRoutes.js");
app.use("/api/tubekids", sessionRoutes);

// JWT Authentication middleware:
const jwtMiddleware = require("./middleware/jwtMiddleware.js");
app.use(jwtMiddleware);

// Import routes of videos and user restricted
const videoRoutes = require("./routes/videoRoutes.js");
const userRestrictedRoutes = require("./routes/restrictedUserRoutes.js");

// Implements routes
app.use("/api/tubekids", videoRoutes);
app.use("/api/tubekids", userRestrictedRoutes);

// Listen on port
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`TubeKids Rest Api listening on port ${PORT}!`)
);
