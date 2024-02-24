// Import all dependencies of the project
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Database connection
const db = mongoose.connect("mongodb://localhost:27017/tubekids");

// Initialize Express application instance
const app = express();

// Parser for the request body to JSON format (required for the POST and PUT methods)
app.use(bodyParser.json());

// Cors:
app.use(cors({
    domains: '*',
    methods: "*"
}));

app.listen(3000, () => console.log(`Project app listening on port 3000!`));