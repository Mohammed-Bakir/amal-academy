import mongoose from 'mongoose';
import Course from './models/Course.js';
import Video from './models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const courses = await Course.find();
    for (const course of courses) {
        const videos = await Video.find({ course: course._id, status: 'published' }).sort({ lessonNumber: 1 });
        console.log(`${course.title} (${course.slug}):`);
        if (videos.length > 0) {
            console.log(`  First video: ${videos[0].title} (${videos[0].slug})`);
        } else {
            console.log('  No videos found');
        }
    }
    process.exit(0);
});