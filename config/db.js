const mongoose = require("mongoose");

async function conectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB...");
  } catch (error) {
    console.log("Connection Failed To MongoDB!", error);
  }
}

module.exports = conectToDB;
