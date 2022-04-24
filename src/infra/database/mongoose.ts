import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URI: string = process.env.DB_URI as string;

const connectDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to database...');
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
