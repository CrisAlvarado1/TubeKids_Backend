const express = require("express");
const router = express.Router();

const { createToken } = require("../controllers/sessionController.js");

// Login route
router.post("/session", createToken);

module.exports = router;
