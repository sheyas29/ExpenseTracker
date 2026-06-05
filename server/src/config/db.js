import mongoose from 'mongoose';
import env from './env.js';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
