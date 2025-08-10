import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'amal-academy-secret', {
        expiresIn: '7d'
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            country,
            city,
            currentLocation,
            educationLevel,
            fieldOfStudy,
            profession,
            experience,
            preferredLanguage,
            learningGoals
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            country: country || 'Syria',
            city,
            currentLocation,
            educationLevel,
            fieldOfStudy,
            profession,
            experience: experience || 'beginner',
            preferredLanguage: preferredLanguage || 'arabic',
            learningGoals: learningGoals || []
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        // Return user data (without password)
        const userData = user.getPublicProfile();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userData,
            token
        });

    } catch (error) {
        console.error('Registration error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact support.'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLoginAt = new Date();
        await user.save();

        // Generate token (longer expiry if remember me is checked)
        const tokenExpiry = rememberMe ? '30d' : '7d';
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'amal-academy-secret', {
            expiresIn: tokenExpiry
        });

        // Return user data (without password)
        const userData = user.getPublicProfile();

        res.json({
            success: true,
            message: 'Login successful',
            user: userData,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('enrolledCourses.course', 'title titleArabic thumbnail')
            .populate('interestedCategories', 'name nameArabic');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userData = user.getPublicProfile();

        res.json({
            success: true,
            user: userData
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Find user with password
        const user = await User.findById(req.user._id).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Don't reveal if email exists or not
            return res.json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // TODO: Send email with reset link
        // For now, just return success (in production, you'd send an actual email)
        console.log(`Password reset token for ${email}: ${resetToken}`);

        res.json({
            success: true,
            message: 'Password reset link sent to your email',
            // Remove this in production
            resetToken: resetToken
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        // Hash the token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid reset token
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password and clear reset token
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.json({
            success: true,
            message: 'Password reset successful'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', auth, (req, res) => {
    // Since we're using JWT, logout is handled client-side by removing the token
    // This endpoint exists for consistency and future token blacklisting if needed
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;