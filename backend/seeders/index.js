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
            },
            {
                name: 'Marketing',
                nameArabic: 'التسويق',
                description: 'Digital marketing and business growth strategies',
                descriptionArabic: 'التسويق الرقمي واستراتيجيات نمو الأعمال',
                slug: 'marketing',
                icon: 'trending-up',
                color: '#F59E0B'
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

        // Create sample courses
        const courses = await Course.insertMany([
            {
                title: 'JavaScript Fundamentals',
                titleArabic: 'أساسيات الجافا سكريبت',
                description: 'Learn JavaScript from scratch with practical examples and projects. This comprehensive course covers variables, functions, objects, arrays, and modern ES6+ features.',
                descriptionArabic: 'تعلم الجافا سكريبت من الصفر مع أمثلة عملية ومشاريع. تغطي هذه الدورة الشاملة المتغيرات والوظائف والكائنات والمصفوفات وميزات ES6+ الحديثة.',
                shortDescription: 'Learn JavaScript from scratch with practical examples and projects',
                shortDescriptionArabic: 'تعلم الجافا سكريبت من الصفر مع أمثلة عملية ومشاريع',
                instructor: instructors[0]._id,
                category: categories[0]._id,
                level: 'beginner',
                language: 'english',
                duration: 480, // 8 hours
                thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
                tags: ['javascript', 'programming', 'beginner'],
                learningOutcomes: [
                    'Understand JavaScript fundamentals',
                    'Work with variables and data types',
                    'Create functions and objects',
                    'Handle events and DOM manipulation'
                ],
                learningOutcomesArabic: [
                    'فهم أساسيات الجافا سكريبت',
                    'العمل مع المتغيرات وأنواع البيانات',
                    'إنشاء الوظائف والكائنات',
                    'التعامل مع الأحداث ومعالجة DOM'
                ],
                prerequisites: ['Basic computer skills', 'Text editor knowledge'],
                prerequisitesArabic: ['مهارات الحاسوب الأساسية', 'معرفة محرر النصوص'],
                targetAudience: ['Beginners to programming', 'Web development enthusiasts'],
                targetAudienceArabic: ['المبتدئين في البرمجة', 'المهتمين بتطوير الويب'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                isFeatured: true,
                status: 'published',
                isActive: true
            },
            {
                title: 'React Development Bootcamp',
                titleArabic: 'معسكر تطوير React',
                description: 'Build modern web applications with React and related technologies. Learn components, hooks, state management, and build real-world projects.',
                descriptionArabic: 'ابني تطبيقات ويب حديثة باستخدام React والتقنيات المرتبطة. تعلم المكونات والخطافات وإدارة الحالة وابني مشاريع حقيقية.',
                shortDescription: 'Build modern web applications with React and related technologies',
                shortDescriptionArabic: 'ابني تطبيقات ويب حديثة باستخدام React والتقنيات المرتبطة',
                instructor: instructors[0]._id,
                category: categories[1]._id,
                level: 'intermediate',
                language: 'both',
                duration: 720, // 12 hours
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
                tags: ['react', 'javascript', 'web-development'],
                learningOutcomes: [
                    'Master React components and JSX',
                    'Understand hooks and state management',
                    'Build responsive user interfaces',
                    'Deploy React applications'
                ],
                learningOutcomesArabic: [
                    'إتقان مكونات React و JSX',
                    'فهم الخطافات وإدارة الحالة',
                    'بناء واجهات مستخدم متجاوبة',
                    'نشر تطبيقات React'
                ],
                prerequisites: ['JavaScript knowledge', 'HTML/CSS basics'],
                prerequisitesArabic: ['معرفة الجافا سكريبت', 'أساسيات HTML/CSS'],
                targetAudience: ['JavaScript developers', 'Frontend developers'],
                targetAudienceArabic: ['مطوري الجافا سكريبت', 'مطوري الواجهة الأمامية'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                isFeatured: true,
                status: 'published',
                isActive: true
            },
            {
                title: 'UI/UX Design Masterclass',
                titleArabic: 'دورة تصميم واجهات المستخدم المتقدمة',
                description: 'Master user interface and user experience design principles. Learn design thinking, prototyping, and create stunning user experiences.',
                descriptionArabic: 'اتقن مبادئ تصميم واجهات وتجربة المستخدم. تعلم التفكير التصميمي والنماذج الأولية وأنشئ تجارب مستخدم مذهلة.',
                shortDescription: 'Master user interface and user experience design principles',
                shortDescriptionArabic: 'اتقن مبادئ تصميم واجهات وتجربة المستخدم',
                instructor: instructors[1]._id,
                category: categories[2]._id,
                level: 'intermediate',
                language: 'both',
                duration: 600, // 10 hours
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop',
                tags: ['ui', 'ux', 'design', 'figma'],
                learningOutcomes: [
                    'Understand UX design principles',
                    'Create wireframes and prototypes',
                    'Design user-centered interfaces',
                    'Use design tools effectively'
                ],
                learningOutcomesArabic: [
                    'فهم مبادئ تصميم UX',
                    'إنشاء الإطارات الشبكية والنماذج الأولية',
                    'تصميم واجهات محورها المستخدم',
                    'استخدام أدوات التصميم بفعالية'
                ],
                prerequisites: ['Basic design knowledge', 'Creative thinking'],
                prerequisitesArabic: ['معرفة التصميم الأساسية', 'التفكير الإبداعي'],
                targetAudience: ['Aspiring designers', 'Developers interested in design'],
                targetAudienceArabic: ['المصممين الطموحين', 'المطورين المهتمين بالتصميم'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                isFeatured: true,
                status: 'published',
                isActive: true
            },
            {
                title: 'Digital Marketing Strategy',
                titleArabic: 'استراتيجية التسويق الرقمي',
                description: 'Learn effective digital marketing techniques and social media strategies to grow your business online.',
                descriptionArabic: 'تعلم تقنيات التسويق الرقمي الفعالة واستراتيجيات وسائل التواصل الاجتماعي لتنمية عملك عبر الإنترنت.',
                shortDescription: 'Learn effective digital marketing techniques and social media strategies',
                shortDescriptionArabic: 'تعلم تقنيات التسويق الرقمي الفعالة واستراتيجيات وسائل التواصل',
                instructor: instructors[1]._id,
                category: categories[3]._id,
                level: 'beginner',
                language: 'both',
                duration: 360, // 6 hours
                thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
                tags: ['marketing', 'digital', 'social-media'],
                learningOutcomes: [
                    'Develop digital marketing strategies',
                    'Master social media marketing',
                    'Understand SEO and content marketing',
                    'Analyze marketing performance'
                ],
                learningOutcomesArabic: [
                    'تطوير استراتيجيات التسويق الرقمي',
                    'إتقان تسويق وسائل التواصل الاجتماعي',
                    'فهم SEO وتسويق المحتوى',
                    'تحليل أداء التسويق'
                ],
                prerequisites: ['Basic business knowledge', 'Internet familiarity'],
                prerequisitesArabic: ['معرفة الأعمال الأساسية', 'الإلمام بالإنترنت'],
                targetAudience: ['Business owners', 'Marketing professionals', 'Entrepreneurs'],
                targetAudienceArabic: ['أصحاب الأعمال', 'المهنيين في التسويق', 'رواد الأعمال'],
                pricing: {
                    type: 'free',
                    price: 0,
                    currency: 'USD'
                },
                isFeatured: true,
                status: 'published',
                isActive: true
            }
        ]);

        console.log('✅ Database seeded successfully!');
        console.log(`📚 Created ${categories.length} categories`);
        console.log(`👥 Created ${instructors.length + 1} users`);
        console.log(`🎓 Created ${courses.length} courses`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();