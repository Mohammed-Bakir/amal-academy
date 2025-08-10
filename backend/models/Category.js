import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    nameArabic: {
        type: String,
        required: [true, 'Arabic category name is required'],
        trim: true,
        maxlength: [100, 'Arabic name cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    descriptionArabic: {
        type: String,
        maxlength: [500, 'Arabic description cannot exceed 500 characters']
    },

    // Visual Elements
    icon: {
        type: String,
        required: [true, 'Category icon is required']
    },
    color: {
        type: String,
        default: '#2563eb',
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
    },
    image: {
        type: String,
        default: null
    },

    // Category Structure
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    level: {
        type: Number,
        default: 0 // 0 = main category, 1 = subcategory, etc.
    },

    // Category Details
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Category slug is required']
    },
    tags: [{
        type: String,
        trim: true
    }],
    tagsArabic: [{
        type: String,
        trim: true
    }],

    // Skills & Learning Paths
    skills: [{
        name: String,
        nameArabic: String,
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced']
        },
        description: String,
        descriptionArabic: String
    }],

    // Career Information
    careerPaths: [{
        title: String,
        titleArabic: String,
        description: String,
        descriptionArabic: String,
        averageSalary: {
            min: Number,
            max: Number,
            currency: { type: String, default: 'USD' }
        },
        jobTitles: [String],
        jobTitlesArabic: [String],
        requiredSkills: [String],
        requiredSkillsArabic: [String]
    }],

    // Category Statistics
    stats: {
        totalCourses: { type: Number, default: 0 },
        totalStudents: { type: Number, default: 0 },
        totalInstructors: { type: Number, default: 0 },
        averageRating: { type: Number, default: 0 },
        totalWatchTime: { type: Number, default: 0 }, // in minutes
        completionRate: { type: Number, default: 0 } // percentage
    },

    // Display Settings
    displayOrder: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    showOnHomepage: {
        type: Boolean,
        default: true
    },

    // Target Audience
    targetAudience: [{
        type: String,
        enum: [
            'students',
            'professionals',
            'job_seekers',
            'entrepreneurs',
            'career_changers',
            'refugees',
            'immigrants',
            'beginners',
            'advanced_learners'
        ]
    }],

    // Learning Outcomes
    learningOutcomes: [{
        outcome: String,
        outcomeArabic: String,
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced']
        }
    }],

    // Industry Relevance
    industries: [{
        name: String,
        nameArabic: String,
        demand: {
            type: String,
            enum: ['low', 'medium', 'high', 'very_high']
        },
        growth: {
            type: String,
            enum: ['declining', 'stable', 'growing', 'rapidly_growing']
        }
    }],

    // Prerequisites
    prerequisites: [{
        type: String
    }],
    prerequisitesArabic: [{
        type: String
    }],

    // SEO & Discovery
    metaTitle: String,
    metaTitleArabic: String,
    metaDescription: String,
    metaDescriptionArabic: String,
    keywords: [String],
    keywordsArabic: [String],

    // Content Guidelines
    contentGuidelines: {
        minCourseDuration: Number, // in minutes
        maxCourseDuration: Number,
        recommendedLessons: Number,
        qualityStandards: [String],
        qualityStandardsArabic: [String]
    },

    // Certification
    certification: {
        available: { type: Boolean, default: false },
        provider: String,
        providerArabic: String,
        validityPeriod: Number, // in months
        requirements: [String],
        requirementsArabic: [String]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better performance
categorySchema.index({ name: 'text', description: 'text', tags: 'text' });
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ level: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ isFeatured: 1 });
categorySchema.index({ displayOrder: 1 });
categorySchema.index({ showOnHomepage: 1 });

// Virtual for course count
categorySchema.virtual('courseCount').get(function () {
    return this.stats.totalCourses;
});

// Virtual for student count
categorySchema.virtual('studentCount').get(function () {
    return this.stats.totalStudents;
});

// Virtual for full path (for breadcrumbs)
categorySchema.virtual('fullPath').get(function () {
    // This would be populated by a separate method
    return this.name;
});

// Pre-save middleware to generate slug
categorySchema.pre('save', function (next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Method to update statistics
categorySchema.methods.updateStats = async function () {
    const Course = mongoose.model('Course');

    // Get all courses in this category
    const courses = await Course.find({
        category: this._id,
        status: 'published',
        isActive: true
    });

    // Calculate statistics
    this.stats.totalCourses = courses.length;
    this.stats.totalStudents = courses.reduce((sum, course) => sum + course.totalEnrollments, 0);

    // Calculate average rating
    const ratingsSum = courses.reduce((sum, course) => sum + (course.ratings.average * course.ratings.count), 0);
    const totalRatings = courses.reduce((sum, course) => sum + course.ratings.count, 0);
    this.stats.averageRating = totalRatings > 0 ? ratingsSum / totalRatings : 0;

    // Calculate total watch time
    this.stats.totalWatchTime = courses.reduce((sum, course) => sum + course.analytics.totalWatchTime, 0);

    // Calculate completion rate
    const totalEnrollments = courses.reduce((sum, course) => sum + course.totalEnrollments, 0);
    const totalCompletions = courses.reduce((sum, course) => {
        return sum + course.enrolledStudents.filter(enrollment => enrollment.progress === 100).length;
    }, 0);
    this.stats.completionRate = totalEnrollments > 0 ? (totalCompletions / totalEnrollments) * 100 : 0;

    return this.save();
};

// Method to add subcategory
categorySchema.methods.addSubcategory = function (subcategoryId) {
    if (!this.subcategories.includes(subcategoryId)) {
        this.subcategories.push(subcategoryId);
    }
    return this.save();
};

// Static method to find main categories
categorySchema.statics.findMainCategories = function () {
    return this.find({
        parent: null,
        isActive: true
    }).sort({ displayOrder: 1, name: 1 });
};

// Static method to find featured categories
categorySchema.statics.findFeatured = function () {
    return this.find({
        isFeatured: true,
        isActive: true
    }).sort({ displayOrder: 1, name: 1 });
};

// Static method to find categories for homepage
categorySchema.statics.findForHomepage = function () {
    return this.find({
        showOnHomepage: true,
        isActive: true
    }).sort({ displayOrder: 1, name: 1 });
};

// Static method to build category tree
categorySchema.statics.buildTree = async function () {
    const categories = await this.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });

    const categoryMap = {};
    const tree = [];

    // Create a map of all categories
    categories.forEach(category => {
        categoryMap[category._id] = {
            ...category.toObject(),
            children: []
        };
    });

    // Build the tree structure
    categories.forEach(category => {
        if (category.parent) {
            const parent = categoryMap[category.parent];
            if (parent) {
                parent.children.push(categoryMap[category._id]);
            }
        } else {
            tree.push(categoryMap[category._id]);
        }
    });

    return tree;
};

// Static method to search categories
categorySchema.statics.searchCategories = function (query) {
    return this.find({
        $text: { $search: query },
        isActive: true
    }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });
};

export default mongoose.model('Category', categorySchema);