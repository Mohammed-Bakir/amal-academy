import mongoose from 'mongoose';
import Video from './models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const videos = await Video.find().limit(3);
        console.log('Sample videos with slugs:');
        videos.forEach(video => {
            console.log(`- ${video.title}: slug='${video.slug}', id=${video._id}`);
        });
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });