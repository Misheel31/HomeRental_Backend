const express = require('express');
const router = express.Router();
const { test, registerUser, loginUser, loginAdmin, forgotPassword, resetPassword } = require('../controller/authController')
// const { authenticateToken } = require("../security/Auth");


//test route
router.get('/', test)

//Authentication routes
router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/login',loginAdmin)

router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword', resetPassword);

module.exports = router;