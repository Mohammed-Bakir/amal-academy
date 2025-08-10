import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Update course progress
router.put('/course/:courseId', auth, async (req, res) => {
    try {
        const { lessonId, progress } = req.body;

        await req.user.updateCourseProgress(req.params.courseId, lessonId, progress);

        res.json({ success: true, message: 'Progress updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user progress
router.get('/user', auth, async (req, res) => {
    try {
        const user = await req.user.populate('enrolledCourses.course', 'title titleArabic thumbnail');

        res.json({
            success: true,
            progress: user.enrolledCourses
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;