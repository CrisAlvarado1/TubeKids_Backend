const mongoose = require("mongoose");

// Function to connect to the database
const dbConnect = async () => {
  try {
    const mongoConnectionString = process.env.DB_CONNECTION_STRING;
    await mongoose.connect(mongoConnectionString);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = { dbConnect };
