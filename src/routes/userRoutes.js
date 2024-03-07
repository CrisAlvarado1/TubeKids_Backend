const express = require('express');
const router = express.Router();

const {
    userPost, userGet, userPut, userDelete, searchUserGet
} = require('../controllers/userController.js');

router.get('/user', userGet);
router.post('/user', userPost);
router.put('/user', userPut);
router.patch('/user', userPut);
router.delete('/user', userDelete);

module.exports = router;