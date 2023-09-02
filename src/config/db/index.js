const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;
async function connectDatabase() {
      try {
            await mongoose.connect(URI);
            console.log("MongoDB connected");
      } catch (error) {
            console.log("Something went wrong with error: ", error);
      }
}
module.exports = { connectDatabase };
