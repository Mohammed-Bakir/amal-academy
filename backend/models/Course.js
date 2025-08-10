import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    titleArabic: {
        type: String,
        trim: true,
        maxlength: [200, 'Arabic title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    descriptionArabic: {
        type: String,
        maxlength: [2000, 'Arabic description cannot exceed 2000 characters']
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    shortDescriptionArabic: {
        type: String,
        maxlength: [300, 'Arabic short description cannot exceed 300 characters']
    },

    // Visual Content
    thumbnail: {
        type: String,
        required: [true, 'Course thumbnail is required']
    },
    previewVideo: {
        type: String,
        default: null
    },
    images: [{
        url: String,
        caption: String,
        captionArabic: String
    }],

    // Course Structure
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Course category is required']
    },
    subcategory: {
        type: String,
        default: ''
    },
    tags: [{
        type: String,
        trim: true
    }],
    tagsArabic: [{
        type: String,
        trim: true
    }],

    // Instructor Information
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Course instructor is required']
    },
    coInstructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    // Course Details
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'all_levels'],
        required: [true, 'Course level is required']
    },
    language: {
        type: String,
        enum: ['arabic', 'english', 'both'],
        default: 'arabic'
    },
    duration: {
        type: Number, // in minutes
        required: [true, 'Course duration is required']
    },

    // Course Content
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    totalLessons: {
        type: Number,
        default: 0
    },

    // Learning Outcomes
    learningOutcomes: [{
        type: String,
        required: true
    }],
    learningOutcomesArabic: [{
        type: String
    }],

    // Prerequisites
    prerequisites: [{
        type: String
    }],
    prerequisitesArabic: [{
        type: String
    }],

    // Target Audience
    targetAudience: [{
        type: String
    }],
    targetAudienceArabic: [{
        type: String
    }],

    // Course Materials
    materials: [{
        title: String,
        titleArabic: String,
        type: {
            type: String,
            enum: ['pdf', 'doc', 'ppt', 'zip', 'link', 'other']
        },
        url: String,
        size: Number, // in bytes
        description: String,
        descriptionArabic: String
    }],

    // Pricing (for future monetization)
    pricing: {
        type: {
            type: String,
            enum: ['free', 'paid', 'subscription'],
            default: 'free'
        },
        price: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'USD'
        },
        discount: {
            percentage: { type: Number, default: 0 },
            validUntil: Date
        }
    },

    // Course Status
    status: {
        type: String,
        enum: ['draft', 'published', 'archived', 'under_review'],
        default: 'draft'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },

    // Enrollment & Statistics
    enrolledStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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
        completedAt: Date,
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        review: String
    }],
    totalEnrollments: {
        type: Number,
        default: 0
    },

    // Ratings & Reviews
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        },
        distribution: {
            5: { type: Number, default: 0 },
            4: { type: Number, default: 0 },
            3: { type: Number, default: 0 },
            2: { type: Number, default: 0 },
            1: { type: Number, default: 0 }
        }
    },

    // Analytics
    analytics: {
        totalViews: { type: Number, default: 0 },
        totalWatchTime: { type: Number, default: 0 }, // in minutes
        completionRate: { type: Number, default: 0 }, // percentage
        averageWatchTime: { type: Number, default: 0 }, // in minutes
        dropOffPoints: [{
            lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
            dropOffRate: Number // percentage
        }]
    },

    // SEO & Discovery
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    metaTitle: String,
    metaDescription: String,
    keywords: [String],

    // Accessibility
    accessibility: {
        hasSubtitles: { type: Boolean, default: false },
        hasTranscripts: { type: Boolean, default: false },
        hasSignLanguage: { type: Boolean, default: false },
        isAccessible: { type: Boolean, default: false }
    },

    // Course Dates
    publishedAt: Date,
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },

    // Special Features
    features: [{
        type: String,
        enum: [
            'certificate',
            'downloadable_resources',
            'lifetime_access',
            'mobile_friendly',
            'offline_viewing',
            'community_access',
            'instructor_support',
            'project_based',
            'hands_on_exercises'
        ]
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better performance
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ status: 1, isActive: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ language: 1 });
courseSchema.index({ 'ratings.average': -1 });
courseSchema.index({ totalEnrollments: -1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ slug: 1 });
courseSchema.index({ isFeatured: 1 });

// Virtual for enrollment count
courseSchema.virtual('enrollmentCount').get(function () {
    return this.enrolledStudents.length;
});

// Virtual for completion rate
courseSchema.virtual('completionRate').get(function () {
    if (this.enrolledStudents.length === 0) return 0;
    const completed = this.enrolledStudents.filter(enrollment =>
        enrollment.progress === 100
    ).length;
    return Math.round((completed / this.enrolledStudents.length) * 100);
});

// Virtual for average rating
courseSchema.virtual('averageRating').get(function () {
    return this.ratings.average;
});

// Pre-save middleware to generate slug
courseSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    // Update lastUpdatedAt
    this.lastUpdatedAt = new Date();

    next();
});

// Pre-save middleware to update total lessons
courseSchema.pre('save', function (next) {
    if (this.isModified('lessons')) {
        this.totalLessons = this.lessons.length;
    }
    next();
});

// Method to enroll student
courseSchema.methods.enrollStudent = function (studentId) {
    const alreadyEnrolled = this.enrolledStudents.some(
        enrollment => enrollment.student.toString() === studentId.toString()
    );

    if (!alreadyEnrolled) {
        this.enrolledStudents.push({
            student: studentId,
            enrolledAt: new Date(),
            progress: 0
        });
        this.totalEnrollments += 1;
    }

    return this.save();
};

// Method to update student progress
courseSchema.methods.updateStudentProgress = function (studentId, progress) {
    const enrollment = this.enrolledStudents.find(
        enrollment => enrollment.student.toString() === studentId.toString()
    );

    if (enrollment) {
        enrollment.progress = Math.max(enrollment.progress, progress);
        if (progress === 100 && !enrollment.completedAt) {
            enrollment.completedAt = new Date();
        }
    }

    return this.save();
};

// Method to add rating
courseSchema.methods.addRating = function (studentId, rating, review = '') {
    const enrollment = this.enrolledStudents.find(
        enrollment => enrollment.student.toString() === studentId.toString()
    );

    if (enrollment) {
        const oldRating = enrollment.rating;
        enrollment.rating = rating;
        enrollment.review = review;

        // Update ratings statistics
        if (oldRating) {
            this.ratings.distribution[oldRating] -= 1;
        } else {
            this.ratings.count += 1;
        }

        this.ratings.distribution[rating] += 1;

        // Recalculate average
        const totalRating = Object.keys(this.ratings.distribution).reduce((sum, star) => {
            return sum + (parseInt(star) * this.ratings.distribution[star]);
        }, 0);

        this.ratings.average = totalRating / this.ratings.count;
    }

    return this.save();
};

// Static method to find featured courses
courseSchema.statics.findFeatured = function () {
    return this.find({
        isFeatured: true,
        status: 'published',
        isActive: true
    }).populate('instructor', 'firstName lastName avatar')
        .populate('category', 'name nameArabic')
        .sort({ createdAt: -1 });
};

// Static method to find courses by category
courseSchema.statics.findByCategory = function (categoryId) {
    return this.find({
        category: categoryId,
        status: 'published',
        isActive: true
    }).populate('instructor', 'firstName lastName avatar')
        .populate('category', 'name nameArabic')
        .sort({ 'ratings.average': -1, totalEnrollments: -1 });
};

// Static method to search courses
courseSchema.statics.searchCourses = function (query, filters = {}) {
    const searchQuery = {
        $text: { $search: query },
        status: 'published',
        isActive: true,
        ...filters
    };

    return this.find(searchQuery, { score: { $meta: 'textScore' } })
        .populate('instructor', 'firstName lastName avatar')
        .populate('category', 'name nameArabic')
        .sort({ score: { $meta: 'textScore' } });
};

export default mongoose.model('Course', courseSchema);