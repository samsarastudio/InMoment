import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Railway: Set MONGODB_URI to ${{ MongoDB.MONGO_URL }} in your service variables
    // Locally: Use .env or fallback to localhost
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inmoment';

    // Log the used URI (mask credentials for security)
    const safeMongoURI = mongoURI.replace(/(mongodb(?:\+srv)?:\/\/)(.*:.*)@/, '$1****:****@');
    console.log('Connecting to MongoDB at:', safeMongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 