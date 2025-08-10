import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📚 Connected to MongoDB');

        const db = mongoose.connection.db;

        // Get all collections
        const collections = await db.listCollections().toArray();
        console.log('📋 Collections found:', collections.map(c => c.name));

        // Drop problematic text indexes
        for (const collection of collections) {
            try {
                const indexes = await db.collection(collection.name).indexes();
                console.log(`\n🔍 Indexes in ${collection.name}:`, indexes.map(i => i.name));

                // Drop text indexes that might cause language issues
                for (const index of indexes) {
                    if (index.textIndexVersion || index.default_language) {
                        console.log(`🗑️ Dropping text index: ${index.name} from ${collection.name}`);
                        await db.collection(collection.name).dropIndex(index.name);
                    }
                }
            } catch (error) {
                console.log(`⚠️ Could not process indexes for ${collection.name}:`, error.message);
            }
        }

        console.log('✅ Index cleanup completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Index cleanup failed:', error);
        process.exit(1);
    }
};

fixIndexes();