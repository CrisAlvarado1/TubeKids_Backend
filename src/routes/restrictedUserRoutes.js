const express = require('express');
const router = express.Router();

const {
    restrictedUserPost, userRestrictedGet, restrictedUserDelete, restrictedUserPut
} = require('../controllers/restrictedUserController.js');

router.get('/restrictedUser', userRestrictedGet)
router.post('/restrictedUser', restrictedUserPost);
router.put('/restrictedUser', restrictedUserPut);
router.patch('/restrictedUser', restrictedUserPut);
router.delete('/restrictedUser', restrictedUserDelete);

module.exports = router;