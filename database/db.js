const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDatabase = async () => {
  const connect = await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, connection) => {
      if (err) {
        console.log("Database cannot be connected");
        console.log(err);
      } else {
        console.log("Database connected");
      }
    }
  );
};

module.exports = { connectDatabase };
