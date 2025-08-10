import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try {
        console.log('🔄 Testing MongoDB connection...');
        console.log('📍 URI:', process.env.MONGODB_URI?.replace(/\/\/.*:.*@/, '//***:***@'));

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB Connected Successfully!');
        console.log('📚 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);

        // Test a simple query
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📋 Collections:', collections.map(c => c.name));

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');

    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
};

testConnection();