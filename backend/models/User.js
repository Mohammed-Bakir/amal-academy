import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    // Basic Information
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't include password in queries by default
    },

    // Profile Information
    avatar: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters'],
        default: ''
    },
    dateOfBirth: {
        type: Date,
        default: null
    },

    // Location & Background
    country: {
        type: String,
        default: 'Syria'
    },
    city: {
        type: String,
        default: ''
    },
    currentLocation: {
        type: String,
        default: ''
    },

    // Educational Background
    educationLevel: {
        type: String,
        enum: ['high_school', 'bachelor', 'master', 'phd', 'other'],
        default: 'other'
    },
    fieldOfStudy: {
        type: String,
        default: ''
    },

    // Professional Information
    profession: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
    },

    // Learning Preferences
    preferredLanguage: {
        type: String,
        enum: ['arabic', 'english', 'both'],
        default: 'arabic'
    },
    learningGoals: [{
        type: String,
        enum: [
            'career_change',
            'skill_improvement',
            'language_learning',
            'entrepreneurship',
            'academic_advancement',
            'personal_development'
        ]
    }],
    interestedCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

    // Account Status
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // Password Reset
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Learning Progress
    enrolledCourses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        completedLessons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }],
        lastAccessedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // Achievements & Certificates
    certificates: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        issuedAt: {
            type: Date,
            default: Date.now
        },
        certificateId: String
    }],

    // Social Features
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Activity Tracking
    totalWatchTime: {
        type: Number,
        default: 0 // in minutes
    },
    coursesCompleted: {
        type: Number,
        default: 0
    },
    lastLoginAt: {
        type: Date,
        default: Date.now
    },
    loginStreak: {
        type: Number,
        default: 0
    },

    // Preferences
    notifications: {
        email: {
            courseUpdates: { type: Boolean, default: true },
            newCourses: { type: Boolean, default: true },
            achievements: { type: Boolean, default: true },
            reminders: { type: Boolean, default: true }
        },
        push: {
            courseUpdates: { type: Boolean, default: true },
            newCourses: { type: Boolean, default: false },
            achievements: { type: Boolean, default: true },
            reminders: { type: Boolean, default: true }
        }
    },

    // Accessibility
    accessibility: {
        subtitles: { type: Boolean, default: false },
        highContrast: { type: Boolean, default: false },
        fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'enrolledCourses.course': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for enrollment count
userSchema.virtual('enrollmentCount').get(function () {
    return this.enrolledCourses.length;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    // Only hash password if it's modified
    if (!this.isModified('password')) return next();

    try {
        // Hash password with cost of 12
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.emailVerificationToken;
    delete userObject.emailVerificationExpires;
    delete userObject.passwordResetToken;
    delete userObject.passwordResetExpires;
    return userObject;
};

// Method to enroll in course
userSchema.methods.enrollInCourse = function (courseId) {
    const alreadyEnrolled = this.enrolledCourses.some(
        enrollment => enrollment.course.toString() === courseId.toString()
    );

    if (!alreadyEnrolled) {
        this.enrolledCourses.push({
            course: courseId,
            enrolledAt: new Date(),
            progress: 0,
            completedLessons: [],
            lastAccessedAt: new Date()
        });
    }

    return this.save();
};

// Method to update course progress
userSchema.methods.updateCourseProgress = function (courseId, lessonId, progress) {
    const enrollment = this.enrolledCourses.find(
        enrollment => enrollment.course.toString() === courseId.toString()
    );

    if (enrollment) {
        // Add lesson to completed if not already there
        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);
        }

        // Update progress
        enrollment.progress = Math.max(enrollment.progress, progress);
        enrollment.lastAccessedAt = new Date();
    }

    return this.save();
};

// Static method to find users by learning goals
userSchema.statics.findByLearningGoals = function (goals) {
    return this.find({
        learningGoals: { $in: goals },
        isActive: true
    });
};

export default mongoose.model('User', userSchema);