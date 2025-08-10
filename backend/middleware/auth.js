import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to verify JWT token
export const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'amal-academy-secret');

        // Check if user still exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found, authorization denied'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account deactivated, authorization denied'
            });
        }

        // Add user info to request
        req.user = user;
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token, authorization denied'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired, authorization denied'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error in authentication'
        });
    }
};

// Middleware to check user role
export const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            const user = req.user; // User is already attached from auth middleware

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Check if user has required role
            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Insufficient permissions.'
                });
            }

            next();
        } catch (error) {
            console.error('Role middleware error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error in role verification'
            });
        }
    };
};

// Middleware for admin only
export const adminAuth = roleMiddleware(['admin']);

// Middleware for instructor and admin
export const instructorAuth = roleMiddleware(['instructor', 'admin']);