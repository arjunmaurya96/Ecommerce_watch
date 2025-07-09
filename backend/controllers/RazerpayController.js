const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order Controller
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const finalAmount = parseInt(amount) * 100; // Convert to paise
        //  console.log("objectfasdfasdfasdf", finalAmount)
        const options = {
            amount: finalAmount,
            currency: "INR",
            receipt: `order_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);

        if (!order || !order.id) {
            return res.status(500).json({ error: "Order creation failed" });
        }

        res.json({
            success: true,
            message: "Order created successfully!",
            order_id: order.id,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Error in createOrder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createOrder };
