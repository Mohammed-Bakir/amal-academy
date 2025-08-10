import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/(^-|-$)/g, '');
}

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('📚 Connected to MongoDB');

        const videos = await Video.find({ slug: { $exists: false } });
        console.log(`Found ${videos.length} videos without slugs`);

        for (const video of videos) {
            video.slug = generateSlug(video.title);
            await video.save();
            console.log(`Updated video: ${video.title} -> ${video.slug}`);
        }

        console.log('✅ All video slugs updated!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });