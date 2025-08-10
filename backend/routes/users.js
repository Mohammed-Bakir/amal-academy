import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('enrolledCourses.course', 'title titleArabic thumbnail')
            .populate('interestedCategories', 'name nameArabic');

        res.json({ success: true, user: user.getPublicProfile() });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const allowedUpdates = [
            'firstName', 'lastName', 'bio', 'dateOfBirth', 'country', 'city',
            'currentLocation', 'educationLevel', 'fieldOfStudy', 'profession',
            'experience', 'preferredLanguage', 'learningGoals', 'interestedCategories',
            'notifications', 'accessibility'
        ];

        const updates = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true, runValidators: true }
        );

        res.json({ success: true, user: user.getPublicProfile() });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Upload avatar
router.post('/avatar', auth, async (req, res) => {
    try {
        const { avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true }
        );

        res.json({ success: true, user: user.getPublicProfile() });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get user's enrolled courses
router.get('/courses', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'enrolledCourses.course',
                populate: {
                    path: 'instructor',
                    select: 'firstName lastName avatar'
                }
            });

        res.json({ success: true, courses: user.enrolledCourses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user's certificates
router.get('/certificates', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('certificates.course', 'title titleArabic thumbnail');

        res.json({ success: true, certificates: user.certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Follow/Unfollow user
router.post('/:id/follow', auth, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!targetUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isFollowing = currentUser.following.includes(req.params.id);

        if (isFollowing) {
            // Unfollow
            currentUser.following.pull(req.params.id);
            targetUser.followers.pull(req.user._id);
        } else {
            // Follow
            currentUser.following.push(req.params.id);
            targetUser.followers.push(req.user._id);
        }

        await currentUser.save();
        await targetUser.save();

        res.json({
            success: true,
            message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
            isFollowing: !isFollowing
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user's dashboard data
router.get('/dashboard', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'enrolledCourses.course',
                populate: {
                    path: 'instructor',
                    select: 'firstName lastName avatar'
                }
            });

        // Calculate stats
        const totalCourses = user.enrolledCourses.length;
        const completedCourses = user.enrolledCourses.filter(enrollment =>
            enrollment.progress === 100
        ).length;
        const inProgressCourses = user.enrolledCourses.filter(enrollment =>
            enrollment.progress > 0 && enrollment.progress < 100
        ).length;

        // Recent activity (last 5 courses accessed)
        const recentCourses = user.enrolledCourses
            .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
            .slice(0, 5);

        res.json({
            success: true,
            dashboard: {
                user: user.getPublicProfile(),
                stats: {
                    totalCourses,
                    completedCourses,
                    inProgressCourses,
                    totalWatchTime: user.totalWatchTime,
                    loginStreak: user.loginStreak
                },
                recentCourses,
                enrolledCourses: user.enrolledCourses
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update last login
router.post('/login-activity', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const now = new Date();
        const lastLogin = user.lastLoginAt;

        // Calculate login streak
        const daysDiff = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
            user.loginStreak += 1;
        } else if (daysDiff > 1) {
            user.loginStreak = 1;
        }

        user.lastLoginAt = now;
        await user.save();

        res.json({ success: true, loginStreak: user.loginStreak });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router; 