import mongoose from 'mongoose';
import Course from './models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('📚 Connected to MongoDB');

        try {
            const course = await Course.findOne({
                slug: 'javascript-fundamentals',
                status: 'published',
                isActive: true
            });

            console.log('Course found:', course ? 'Yes' : 'No');
            if (course) {
                console.log('Course details:', {
                    title: course.title,
                    slug: course.slug,
                    instructor: course.instructor,
                    category: course.category
                });
            }

            // Try with populate
            const courseWithPopulate = await Course.findOne({
                slug: 'javascript-fundamentals',
                status: 'published',
                isActive: true
            })
                .populate('instructor', 'firstName lastName avatar bio')
                .populate('category', 'name nameArabic');

            console.log('Course with populate:', courseWithPopulate ? 'Success' : 'Failed');

        } catch (error) {
            console.error('Error:', error.message);
        }

        process.exit(0);
    })
    .catch(err => {
        console.error('Connection Error:', err);
        process.exit(1);
    });