const express = require("express");
const router = express.Router();

const { userPost, userGet } = require("../controllers/userController.js");

router.get("/user", userGet);
router.post("/user", userPost);

module.exports = router;
