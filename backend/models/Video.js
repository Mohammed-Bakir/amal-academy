import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: [true, 'Video title is required'],
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
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    descriptionArabic: {
        type: String,
        maxlength: [1000, 'Arabic description cannot exceed 1000 characters']
    },

    // Course Association
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Video must belong to a course']
    },

    // Video Content
    videoUrl: {
        type: String,
        required: [true, 'Video URL is required']
    },
    thumbnail: {
        type: String,
        required: [true, 'Video thumbnail is required']
    },
    duration: {
        type: Number, // in seconds
        required: [true, 'Video duration is required']
    },

    // Video Quality Options
    qualities: [{
        quality: {
            type: String,
            enum: ['240p', '360p', '480p', '720p', '1080p'],
            required: true
        },
        url: {
            type: String,
            required: true
        },
        size: Number // file size in bytes
    }],

    // Lesson Structure
    lessonNumber: {
        type: Number,
        required: [true, 'Lesson number is required']
    },
    section: {
        name: String,
        nameArabic: String,
        number: Number
    },

    // Content Details
    type: {
        type: String,
        enum: ['lesson', 'introduction', 'summary', 'exercise', 'project', 'quiz'],
        default: 'lesson'
    },
    isPreview: {
        type: Boolean,
        default: false // Free preview for non-enrolled students
    },

    // Subtitles & Transcripts
    subtitles: [{
        language: {
            type: String,
            enum: ['arabic', 'english'],
            required: true
        },
        url: String,
        content: String // VTT format content
    }],
    transcript: {
        arabic: String,
        english: String
    },

    // Learning Materials
    attachments: [{
        title: String,
        titleArabic: String,
        type: {
            type: String,
            enum: ['pdf', 'doc', 'ppt', 'zip', 'code', 'other']
        },
        url: String,
        size: Number,
        description: String,
        descriptionArabic: String
    }],

    // Interactive Elements
    quiz: {
        questions: [{
            question: String,
            questionArabic: String,
            type: {
                type: String,
                enum: ['multiple_choice', 'true_false', 'fill_blank', 'short_answer']
            },
            options: [String], // For multiple choice
            optionsArabic: [String],
            correctAnswer: String,
            explanation: String,
            explanationArabic: String,
            points: { type: Number, default: 1 }
        }],
        passingScore: { type: Number, default: 70 },
        timeLimit: Number, // in minutes
        attempts: { type: Number, default: 3 }
    },

    // Video Analytics
    analytics: {
        totalViews: { type: Number, default: 0 },
        uniqueViews: { type: Number, default: 0 },
        totalWatchTime: { type: Number, default: 0 }, // in seconds
        averageWatchTime: { type: Number, default: 0 },
        completionRate: { type: Number, default: 0 }, // percentage

        // Engagement metrics
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },

        // Watch patterns
        dropOffPoints: [{
            timestamp: Number, // in seconds
            dropOffRate: Number // percentage of viewers who stopped here
        }],
        replaySegments: [{
            startTime: Number,
            endTime: Number,
            replayCount: Number
        }]
    },

    // Student Progress Tracking
    studentProgress: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        watchTime: { type: Number, default: 0 }, // in seconds
        lastWatchedAt: { type: Date, default: Date.now },
        isCompleted: { type: Boolean, default: false },
        completedAt: Date,
        bookmarks: [{
            timestamp: Number,
            note: String,
            noteArabic: String,
            createdAt: { type: Date, default: Date.now }
        }],
        quizAttempts: [{
            attemptNumber: Number,
            score: Number,
            answers: [{
                questionIndex: Number,
                answer: String,
                isCorrect: Boolean
            }],
            completedAt: { type: Date, default: Date.now }
        }]
    }],

    // Comments & Discussions
    comments: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String,
        timestamp: Number, // video timestamp where comment was made
        replies: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String,
            createdAt: { type: Date, default: Date.now }
        }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isInstructorReply: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],

    // Video Status
    status: {
        type: String,
        enum: ['draft', 'processing', 'published', 'archived'],
        default: 'draft'
    },
    isActive: {
        type: Boolean,
        default: true
    },

    // Technical Details
    encoding: {
        format: String,
        codec: String,
        bitrate: Number,
        resolution: String,
        fps: Number
    },

    // SEO
    slug: {
        type: String,
        lowercase: true
    },
    tags: [String],
    tagsArabic: [String],

    // Accessibility
    accessibility: {
        hasAudioDescription: { type: Boolean, default: false },
        hasSignLanguage: { type: Boolean, default: false },
        isAccessible: { type: Boolean, default: false }
    },

    // Publishing
    publishedAt: Date,
    scheduledAt: Date, // For scheduled publishing

    // Version Control
    version: {
        type: Number,
        default: 1
    },
    previousVersions: [{
        version: Number,
        videoUrl: String,
        updatedAt: Date,
        changeLog: String
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better performance
videoSchema.index({ course: 1, lessonNumber: 1 });
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ status: 1, isActive: 1 });
videoSchema.index({ type: 1 });
videoSchema.index({ isPreview: 1 });
videoSchema.index({ 'studentProgress.student': 1 });
videoSchema.index({ slug: 1 });
videoSchema.index({ publishedAt: -1 });

// Virtual for formatted duration
videoSchema.virtual('formattedDuration').get(function () {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Virtual for completion rate
videoSchema.virtual('completionRate').get(function () {
    if (this.studentProgress.length === 0) return 0;
    const completed = this.studentProgress.filter(progress => progress.isCompleted).length;
    return Math.round((completed / this.studentProgress.length) * 100);
});

// Virtual for average watch time
videoSchema.virtual('averageWatchTime').get(function () {
    if (this.studentProgress.length === 0) return 0;
    const totalWatchTime = this.studentProgress.reduce((sum, progress) => sum + progress.watchTime, 0);
    return Math.round(totalWatchTime / this.studentProgress.length);
});

// Pre-save middleware to generate slug
videoSchema.pre('save', function (next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s]+/g, '')
            .replace(/\s+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Method to track student progress
videoSchema.methods.updateStudentProgress = function (studentId, watchTime, isCompleted = false) {
    let progress = this.studentProgress.find(
        p => p.student.toString() === studentId.toString()
    );

    if (!progress) {
        progress = {
            student: studentId,
            watchTime: 0,
            lastWatchedAt: new Date(),
            isCompleted: false,
            bookmarks: [],
            quizAttempts: []
        };
        this.studentProgress.push(progress);
    }

    // Update watch time (take the maximum to handle replays)
    progress.watchTime = Math.max(progress.watchTime, watchTime);
    progress.lastWatchedAt = new Date();

    // Mark as completed if watch time is >= 90% of video duration
    if (isCompleted || (watchTime / this.duration) >= 0.9) {
        progress.isCompleted = true;
        if (!progress.completedAt) {
            progress.completedAt = new Date();
        }
    }

    // Update analytics
    this.analytics.totalWatchTime += watchTime;
    this.analytics.totalViews += 1;

    return this.save();
};

// Method to add bookmark
videoSchema.methods.addBookmark = function (studentId, timestamp, note = '', noteArabic = '') {
    let progress = this.studentProgress.find(
        p => p.student.toString() === studentId.toString()
    );

    if (!progress) {
        progress = {
            student: studentId,
            watchTime: 0,
            lastWatchedAt: new Date(),
            isCompleted: false,
            bookmarks: [],
            quizAttempts: []
        };
        this.studentProgress.push(progress);
    }

    progress.bookmarks.push({
        timestamp,
        note,
        noteArabic,
        createdAt: new Date()
    });

    return this.save();
};

// Method to add comment
videoSchema.methods.addComment = function (studentId, content, timestamp = 0) {
    this.comments.push({
        student: studentId,
        content,
        timestamp,
        replies: [],
        likes: [],
        createdAt: new Date()
    });

    this.analytics.comments += 1;

    return this.save();
};

// Method to like/unlike video
videoSchema.methods.toggleLike = function (studentId, isLike = true) {
    if (isLike) {
        this.analytics.likes += 1;
        if (this.analytics.dislikes > 0) {
            this.analytics.dislikes -= 1;
        }
    } else {
        this.analytics.dislikes += 1;
        if (this.analytics.likes > 0) {
            this.analytics.likes -= 1;
        }
    }

    return this.save();
};

// Static method to find videos by course
videoSchema.statics.findByCourse = function (courseId) {
    return this.find({
        course: courseId,
        status: 'published',
        isActive: true
    }).sort({ lessonNumber: 1 });
};

// Static method to find preview videos
videoSchema.statics.findPreviews = function (courseId) {
    return this.find({
        course: courseId,
        isPreview: true,
        status: 'published',
        isActive: true
    }).sort({ lessonNumber: 1 });
};

export default mongoose.model('Video', videoSchema);