const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, signupUser, loginUser } = require('../controllers/authControllers');

// middleware
router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

router.get('/', test);
router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;