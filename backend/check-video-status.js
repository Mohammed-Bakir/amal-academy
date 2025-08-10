import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('📚 Connected to MongoDB');

        const videos = await Video.find();
        console.log('Video statuses:');
        videos.forEach(video => {
            console.log(`- ${video.title}: status='${video.status}', isActive=${video.isActive}`);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });