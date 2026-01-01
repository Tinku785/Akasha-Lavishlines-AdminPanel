import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGO_URI);

const run = async () => {
    try {
        await connectDB();
        console.log('Test finished successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Test failed with error:', error);
        process.exit(1);
    }
};

run();
