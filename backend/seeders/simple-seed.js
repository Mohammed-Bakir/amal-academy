import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Category from '../models/Category.js';
import Video from '../models/Video.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amal-academy');
        console.log('📚 Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});
        await Category.deleteMany({});
        await Video.deleteMany({});
        console.log('🧹 Cleared existing data');

        // Create categories
        const categories = await Category.insertMany([
            {
                name: 'Programming',
                nameArabic: 'البرمجة',
                description: 'Learn programming languages and software development',
                descriptionArabic: 'تعلم لغات البرمجة وتطوير البرمجيات',
                slug: 'programming',
                icon: 'code',
                color: '#3B82F6'
            },
            {
                name: 'Web Development',
                nameArabic: 'تطوير المواقع',
                description: 'Build modern websites and web applications',
                descriptionArabic: 'ابني مواقع وتطبيقات ويب حديثة',
                slug: 'web-development',
                icon: 'globe',
                color: '#10B981'
            },
            {
                name: 'Design',
                nameArabic: 'التصميم',
                description: 'UI/UX design and graphic design courses',
                descriptionArabic: 'دورات تصميم واجهات المستخدم والتصميم الجرافيكي',
                slug: 'design',
                icon: 'palette',
                color: '#8B5CF6'
            }
        ]);

        // Create admin user
        const adminUser = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@amalacademy.com',
            password: 'admin123',
            role: 'admin',
            isEmailVerified: true,
            bio: 'System Administrator',
            country: 'Syria',
            city: 'Damascus'
        });

        // Create instructor users
        const instructors = await User.insertMany([
            {
                firstName: 'Ahmad',
                lastName: 'Hassan',
                email: 'ahmad@amalacademy.com',
                password: 'instructor123',
                role: 'instructor',
                isEmailVerified: true,
                bio: 'Senior Software Developer with 8+ years experience',
                country: 'Syria',
                city: 'Aleppo',
                profession: 'Software Developer'
            },
            {
                firstName: 'Fatima',
                lastName: 'Al-Zahra',
                email: 'fatima@amalacademy.com',
                password: 'instructor123',
                role: 'instructor',
                isEmailVerified: true,
                bio: 'UI/UX Designer and Frontend Developer',
                country: 'Syria',
                city: 'Damascus',
                profession: 'UI/UX Designer'
            }
        ]);

        // We'll create videos after courses since they need course references

        // Create sample courses (simplified)
        const courses = await Course.insertMany([
            {
                title: 'JavaScript Fundamentals',
                titleArabic: 'أساسيات الجافا سكريبت',
                slug: 'javascript-fundamentals',
                description: 'Learn JavaScript from scratch with practical examples and projects.',
                descriptionArabic: 'تعلم الجافا سكريبت من الصفر مع أمثلة عملية ومشاريع.',
                shortDescription: 'Learn JavaScript from scratch',
                shortDescriptionArabic: 'تعلم الجافا سكريبت من الصفر',
                instructor: instructors[0]._id,
                category: categories[0]._id,
                level: 'beginner',
                language: 'english',
                duration: 480,
                thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
                tags: ['javascript', 'programming', 'beginner'],
                learningOutcomes: ['Understand JavaScript fundamentals', 'Work with variables and data types'],
                learningOutcomesArabic: ['فهم أساسيات الجافا سكريبت', 'العمل مع المتغيرات وأنواع البيانات'],
                prerequisites: ['Basic computer skills'],
                prerequisitesArabic: ['مهارات الحاسوب الأساسية'],
                targetAudience: ['Beginners to programming'],
                targetAudienceArabic: ['المبتدئين في البرمجة'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                totalLessons: 3,
                isFeatured: true,
                status: 'published',
                isActive: true
            },
            {
                title: 'React Development',
                titleArabic: 'تطوير React',
                slug: 'react-development',
                description: 'Build modern web applications with React.',
                descriptionArabic: 'ابني تطبيقات ويب حديثة باستخدام React.',
                shortDescription: 'Build modern web applications with React',
                shortDescriptionArabic: 'ابني تطبيقات ويب حديثة باستخدام React',
                instructor: instructors[0]._id,
                category: categories[1]._id,
                level: 'intermediate',
                language: 'english',
                duration: 720,
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
                tags: ['react', 'javascript', 'web-development'],
                learningOutcomes: ['Master React components', 'Understand hooks and state management'],
                learningOutcomesArabic: ['إتقان مكونات React', 'فهم الخطافات وإدارة الحالة'],
                prerequisites: ['JavaScript knowledge'],
                prerequisitesArabic: ['معرفة الجافا سكريبت'],
                targetAudience: ['JavaScript developers'],
                targetAudienceArabic: ['مطوري الجافا سكريبت'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                totalLessons: 2,
                isFeatured: true,
                status: 'published',
                isActive: true
            },
            {
                title: 'UI/UX Design',
                titleArabic: 'تصميم واجهات المستخدم',
                slug: 'ui-ux-design',
                description: 'Master user interface and user experience design principles.',
                descriptionArabic: 'اتقن مبادئ تصميم واجهات وتجربة المستخدم.',
                shortDescription: 'Master UI/UX design principles',
                shortDescriptionArabic: 'اتقن مبادئ تصميم واجهات المستخدم',
                instructor: instructors[1]._id,
                category: categories[2]._id,
                level: 'intermediate',
                language: 'english',
                duration: 600,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop',
                tags: ['ui', 'ux', 'design'],
                learningOutcomes: ['Understand UX design principles', 'Create wireframes and prototypes'],
                learningOutcomesArabic: ['فهم مبادئ تصميم UX', 'إنشاء الإطارات الشبكية والنماذج الأولية'],
                prerequisites: ['Basic design knowledge'],
                prerequisitesArabic: ['معرفة التصميم الأساسية'],
                targetAudience: ['Aspiring designers'],
                targetAudienceArabic: ['المصممين الطموحين'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                totalLessons: 1,
                isFeatured: true,
                status: 'published',
                isActive: true
            }
        ]);

        // Create sample videos for courses
        const videos = await Video.insertMany([
            // JavaScript course videos
            {
                title: 'Welcome to JavaScript',
                titleArabic: 'مرحباً بك في الجافا سكريبت',
                description: 'Introduction to JavaScript programming language',
                descriptionArabic: 'مقدمة في لغة البرمجة الجافا سكريبت',
                course: courses[0]._id,
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
                duration: 300, // 5 minutes
                lessonNumber: 1,
                type: 'lesson',
                isPreview: true
            },
            {
                title: 'Variables and Data Types',
                titleArabic: 'المتغيرات وأنواع البيانات',
                description: 'Learn about JavaScript variables and data types',
                descriptionArabic: 'تعلم عن المتغيرات وأنواع البيانات في الجافا سكريبت',
                course: courses[0]._id,
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
                duration: 900, // 15 minutes
                lessonNumber: 2,
                type: 'lesson'
            },
            {
                title: 'Functions and Scope',
                titleArabic: 'الوظائف والنطاق',
                description: 'Understanding JavaScript functions and scope',
                descriptionArabic: 'فهم الوظائف والنطاق في الجافا سكريبت',
                course: courses[0]._id,
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
                duration: 1200, // 20 minutes
                lessonNumber: 3,
                type: 'lesson'
            },
            // React course videos
            {
                title: 'React Components',
                titleArabic: 'مكونات React',
                description: 'Introduction to React components',
                descriptionArabic: 'مقدمة في مكونات React',
                course: courses[1]._id,
                videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
                duration: 1800, // 30 minutes
                lessonNumber: 1,
                type: 'lesson',
                isPreview: true
            },
            {
                title: 'State and Props',
                titleArabic: 'الحالة والخصائص',
                description: 'Understanding React state and props',
                descriptionArabic: 'فهم الحالة والخصائص في React',
                course: courses[1]._id,
                videoUrl: 'https://www.w3schools.com/html/movie.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
                duration: 1500, // 25 minutes
                lessonNumber: 2,
                type: 'lesson'
            },
            // UI/UX course video
            {
                title: 'Design Principles',
                titleArabic: 'مبادئ التصميم',
                description: 'Fundamental design principles for UI/UX',
                descriptionArabic: 'مبادئ التصميم الأساسية لواجهات المستخدم',
                course: courses[2]._id,
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop',
                duration: 2100, // 35 minutes
                lessonNumber: 1,
                type: 'lesson',
                isPreview: true
            }
        ]);

        // Update courses with their video lessons
        await Course.findByIdAndUpdate(courses[0]._id, {
            lessons: videos.filter(v => v.course.toString() === courses[0]._id.toString()).map(v => v._id)
        });
        await Course.findByIdAndUpdate(courses[1]._id, {
            lessons: videos.filter(v => v.course.toString() === courses[1]._id.toString()).map(v => v._id)
        });
        await Course.findByIdAndUpdate(courses[2]._id, {
            lessons: videos.filter(v => v.course.toString() === courses[2]._id.toString()).map(v => v._id)
        });

        console.log('✅ Database seeded successfully!');
        console.log(`📚 Created ${categories.length} categories`);
        console.log(`👥 Created ${instructors.length + 1} users (including admin)`);
        console.log(`🎥 Created ${videos.length} videos`);
        console.log(`🎓 Created ${courses.length} courses`);

        // Log test accounts
        console.log('\n🔐 Test Accounts:');
        console.log('Admin: admin@amalacademy.com / admin123');
        console.log('Instructor 1: ahmad@amalacademy.com / instructor123');
        console.log('Instructor 2: fatima@amalacademy.com / instructor123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();