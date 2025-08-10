import mongoose from 'mongoose';
import Course from './models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('📚 Connected to MongoDB');

        const courses = await Course.find();
        console.log('Available courses:');
        courses.forEach(course => {
            console.log(`- ${course.title}: slug='${course.slug}', id=${course._id}`);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });