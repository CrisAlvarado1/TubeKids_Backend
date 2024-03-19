const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database using the provided connection string.
 * 
 * @returns {Promise<void>} A promise that resolves once the connection is successful or rejects if there's an error.
 */
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
