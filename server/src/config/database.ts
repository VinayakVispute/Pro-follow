const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONOGO_URI = process.env.MONGODB_URI;
        if (!MONOGO_URI) {
            throw new Error('MongoDB URI is required for connection');
        }
        await mongoose.connect(MONOGO_URI,);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;

