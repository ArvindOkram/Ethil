import mongoose from "mongoose"

export const connectMongoDB = async () => {
    console.log('mongo: ',process.env.MONGO_URL!);
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}