const express = require("express");
const router = express.Router();

const { userGet } = require("../controllers/userController.js");

router.get("/userInfo", userGet);

module.exports = router;
