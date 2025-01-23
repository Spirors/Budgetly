const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test } = require('../controllers/authControllers');

// middleware
router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

router.get('/', test);

module.exports = router;