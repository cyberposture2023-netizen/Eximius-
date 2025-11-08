const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env.MONGO_URI will be loaded from the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(MongoDB Connected: );
  } catch (error) {
    console.error(Error connecting to MongoDB: );
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
