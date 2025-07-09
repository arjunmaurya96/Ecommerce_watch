const mongoose = require("mongoose");
const colors = require("colors");

const DbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected Successfully...! ${conn.connection.host}`.bgMagenta);
  } catch (error) {
    console.log(error);
    console.log(`Database not connected: ${error.message}`.bgRed.white);
  }
};

DbConnect();
