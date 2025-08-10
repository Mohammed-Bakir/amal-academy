import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('📚 Connected to MongoDB');

        const result = await Video.updateMany(
            { status: { $ne: 'published' } },
            { $set: { status: 'published', isActive: true } }
        );

        console.log(`✅ Updated ${result.modifiedCount} videos to published status`);

        // Verify the update
        const publishedVideos = await Video.find({ status: 'published' });
        console.log(`📹 Total published videos: ${publishedVideos.length}`);

        publishedVideos.forEach(video => {
            console.log(`- ${video.title}: status=${video.status}, slug=${video.slug}`);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });