const express = require('express');

const {
    handleLoginUser,
    handleRegisterUser
} = require('../controllers/userController');


const router = express.Router();

router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);

module.exports = router;