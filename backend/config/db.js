const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://someshrocks144:somesh2004@cluster0.if8opdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected");
  } catch (error) {
    console.log("Error");
  }
};

module.exports = connectDB;
