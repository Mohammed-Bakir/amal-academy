import mongoose from 'mongoose';
import Video from './models/Video.js';
import Course from './models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('📚 Connected to MongoDB');

        // Get the course
        const course = await Course.findOne({ slug: 'javascript-fundamentals' });
        console.log('Course ID:', course._id);

        // Get all videos
        const allVideos = await Video.find();
        console.log('\nAll videos:');
        allVideos.forEach(video => {
            console.log(`- ${video.title}: course=${video.course}, slug=${video.slug}`);
        });

        // Try to find videos for this course
        const courseVideos = await Video.find({ course: course._id });
        console.log('\nVideos for this course:', courseVideos.length);

        // Try the static method
        const staticVideos = await Video.findByCourse(course._id);
        console.log('Videos from static method:', staticVideos.length);

        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });