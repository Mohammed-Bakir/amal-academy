import express from 'express';
import Course from '../models/Course.js';
import Video from '../models/Video.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Admin dashboard stats
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'student' });
        const totalCourses = await Course.countDocuments({ status: 'published' });
        const totalVideos = await Video.countDocuments({ status: 'published' });
        const totalCategories = await Category.countDocuments({ isActive: true });

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalCourses,
                totalVideos,
                totalCategories
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all users (admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const users = await User.find({ role: 'student' })
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await User.countDocuments({ role: 'student' });

        res.json({
            success: true,
            users,
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

export default router;