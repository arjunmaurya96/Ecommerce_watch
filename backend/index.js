require('dotenv').config();
const express = require('express');
const colors = require("colors")

const morgan = require("morgan")
const cors = require("cors")
const authRoutes = require("./routes/authRoute")
const categoryRoutes = require('./routes/CategoryRoute')
const productRoutes = require("./routes/ProductRoutes")
const paymentRoutes = require('./routes/PaymentRoute');


const app = express();
// const port = process.env.PORT || 4000;
const port = process.env.PORT || 4000;





// console.log('CLOUD_NAME', process.env.CLOUD_NAME)

// middleware 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// connect database 
require('./DB/dbconnection');

// all routes
app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)

// razorpay 
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send("hello world ");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgCyan.white);
});
