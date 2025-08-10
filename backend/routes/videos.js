import express from 'express';
import Video from '../models/Video.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get videos by course (public access for preview)
router.get('/course/:courseId/public', async (req, res) => {
    try {
        const videos = await Video.findByCourse(req.params.courseId);
        res.json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get videos by course (authenticated)
router.get('/course/:courseId', auth, async (req, res) => {
    try {
        const videos = await Video.findByCourse(req.params.courseId);
        res.json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get video by slug
router.get('/:slug', auth, async (req, res) => {
    try {
        const video = await Video.findOne({ slug: req.params.slug, status: 'published', isActive: true })
            .populate('course', 'title titleArabic');

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        res.json({ success: true, video });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update video progress
router.put('/:id/progress', auth, async (req, res) => {
    try {
        const { watchTime, isCompleted } = req.body;
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        await video.updateStudentProgress(req.user._id, watchTime, isCompleted);
        res.json({ success: true, message: 'Progress updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add bookmark
router.post('/:id/bookmark', auth, async (req, res) => {
    try {
        const { timestamp, note, noteArabic } = req.body;
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        await video.addBookmark(req.user._id, timestamp, note, noteArabic);
        res.json({ success: true, message: 'Bookmark added' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;