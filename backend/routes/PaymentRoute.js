const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/RazerpayController');

// Route to create Razorpay order
router.post('/create-order', createOrder);

module.exports = router;
