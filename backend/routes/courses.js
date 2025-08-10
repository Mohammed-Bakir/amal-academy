import express from 'express';
import Course from '../models/Course.js';
import Category from '../models/Category.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all courses with filters
router.get('/', async (req, res) => {
    try {
        const { category, level, language, search, page = 1, limit = 12 } = req.query;

        let query = { status: 'published', isActive: true };

        if (category) query.category = category;
        if (level) query.level = level;
        if (language) query.language = language;
        if (search) {
            query.$text = { $search: search };
        }

        const courses = await Course.find(query)
            .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Course.countDocuments(query);

        res.json({
            success: true,
            courses,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get featured courses
router.get('/featured', async (req, res) => {
    try {
        const courses = await Course.findFeatured();
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get course by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const course = await Course.findOne({
            slug: req.params.slug,
            status: 'published',
            isActive: true
        });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get course by slug (alternative route)
router.get('/:slug', async (req, res) => {
    try {
        const course = await Course.findOne({
            slug: req.params.slug,
            status: 'published',
            isActive: true
        });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        await course.enrollStudent(req.user._id);
        await req.user.enrollInCourse(req.params.id);

        res.json({ success: true, message: 'Successfully enrolled in course' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;