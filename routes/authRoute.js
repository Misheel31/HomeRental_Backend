const express = require('express');
const router = express.Router();
const { test, registerUser, loginUser } = require('../controller/authController')
// const { authenticateToken } = require("../security/Auth");


//test route
router.get('/', test)

//Authentication routes
router.post('/register', registerUser)
router.post('/login', loginUser)



module.exports = router;