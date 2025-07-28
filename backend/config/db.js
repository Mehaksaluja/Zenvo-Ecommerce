import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...'); // Log 1
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log 2
  } catch (error) {
    console.error(`DATABASE CONNECTION ERROR: ${error.message}`); // Log 3
    process.exit(1);
  }
};

export default connectDB;