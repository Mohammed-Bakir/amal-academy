import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
    ar: {
        translation: {
            // Common
            common: {
                loading: 'جاري التحميل...',
                error: 'حدث خطأ',
                success: 'تم بنجاح',
                cancel: 'إلغاء',
                save: 'حفظ',
                edit: 'تعديل',
                delete: 'حذف',
                confirm: 'تأكيد',
                back: 'رجوع',
                next: 'التالي',
                previous: 'السابق',
                search: 'بحث',
                filter: 'تصفية',
                sort: 'ترتيب',
                view: 'عرض',
                download: 'تحميل',
                share: 'مشاركة',
                like: 'إعجاب',
                comment: 'تعليق',
                subscribe: 'اشتراك',
                unsubscribe: 'إلغاء الاشتراك',
                login: 'تسجيل الدخول',
                register: 'إنشاء حساب',
                logout: 'تسجيل الخروج',
                profile: 'الملف الشخصي',
                settings: 'الإعدادات',
                help: 'مساعدة',
                about: 'حول',
                contact: 'اتصل بنا',
                privacy: 'الخصوصية',
                terms: 'الشروط والأحكام',
                darkMode: 'الوضع المظلم',
                lightMode: 'الوضع المضيء',
            },

            // Meta
            meta: {
                title: 'أكاديمية الأمل - منصة تعليمية للمتعلمين السوريين',
                description: 'منصة تعليمية مخصصة للمتعلمين السوريين لتطوير المهارات وبناء مستقبل أفضل من خلال دورات عالية الجودة',
                keywords: 'تعليم، سوريا، تعلم، مهارات، دورات، عربي، إنجليزي، مهنة',
            },

            // Navigation
            nav: {
                home: 'الرئيسية',
                courses: 'الدورات',
                categories: 'التصنيفات',
                search: 'البحث',
                about: 'حول الأكاديمية',
                contact: 'اتصل بنا',
                dashboard: 'لوحة التحكم',
                myLearning: 'تعلمي',
                profile: 'الملف الشخصي',
                settings: 'الإعدادات',
                admin: 'الإدارة',
            },

            // Home page
            home: {
                hero: {
                    title: 'ابني مستقبلك مع أكاديمية الأمل',
                    subtitle: 'منصة تعليمية مخصصة للمتعلمين السوريين لتطوير المهارات المهنية والشخصية',
                    cta: 'ابدأ التعلم الآن',
                    watchIntro: 'شاهد الفيديو التعريفي',
                },
                features: {
                    title: 'لماذا أكاديمية الأمل؟',
                    subtitle: 'نحن نفهم التحديات التي تواجه المتعلمين السوريين ونقدم حلولاً مصممة خصيصاً لكم',
                    items: {
                        bilingual: {
                            title: 'محتوى ثنائي اللغة',
                            description: 'دورات باللغتين العربية والإنجليزية مع ترجمة شاملة',
                        },
                        practical: {
                            title: 'مهارات عملية',
                            description: 'تركيز على المهارات المطلوبة في سوق العمل الحديث',
                        },
                        community: {
                            title: 'مجتمع داعم',
                            description: 'تواصل مع متعلمين آخرين ومرشدين من ذوي الخبرة',
                        },
                        certificates: {
                            title: 'شهادات معتمدة',
                            description: 'احصل على شهادات إتمام معترف بها دولياً',
                        },
                        flexible: {
                            title: 'تعلم مرن',
                            description: 'تعلم في أي وقت ومن أي مكان بما يناسب ظروفك',
                        },
                        affordable: {
                            title: 'تكلفة مناسبة',
                            description: 'دورات مجانية ومدفوعة بأسعار في متناول الجميع',
                        },
                    },
                },
                categories: {
                    title: 'استكشف التصنيفات',
                    subtitle: 'اختر المجال الذي يناسب أهدافك المهنية',
                    viewAll: 'عرض جميع التصنيفات',
                },
                featured: {
                    title: 'الدورات المميزة',
                    subtitle: 'دورات مختارة بعناية لتطوير مهاراتك',
                    viewAll: 'عرض جميع الدورات',
                },
                testimonials: {
                    title: 'قصص نجاح',
                    subtitle: 'اكتشف كيف غيرت أكاديمية الأمل حياة المتعلمين',
                },
                cta: {
                    title: 'ابدأ رحلتك التعليمية اليوم',
                    subtitle: 'انضم إلى آلاف المتعلمين الذين يطورون مهاراتهم مع أكاديمية الأمل',
                    button: 'إنشاء حساب مجاني',
                },
            },

            // Courses
            courses: {
                title: 'الدورات التدريبية',
                subtitle: 'اكتشف مجموعة واسعة من الدورات المصممة لتطوير مهاراتك',
                search: 'ابحث عن دورة...',
                filter: {
                    all: 'جميع الدورات',
                    free: 'مجانية',
                    paid: 'مدفوعة',
                    beginner: 'مبتدئ',
                    intermediate: 'متوسط',
                    advanced: 'متقدم',
                    arabic: 'عربي',
                    english: 'إنجليزي',
                    both: 'ثنائي اللغة',
                },
                sort: {
                    newest: 'الأحدث',
                    oldest: 'الأقدم',
                    popular: 'الأكثر شعبية',
                    rating: 'الأعلى تقييماً',
                    duration: 'المدة',
                },
                card: {
                    lessons: 'درس',
                    hours: 'ساعة',
                    students: 'طالب',
                    rating: 'تقييم',
                    free: 'مجاني',
                    enroll: 'التسجيل',
                    enrolled: 'مسجل',
                    continue: 'متابعة',
                    completed: 'مكتمل',
                },
                empty: {
                    title: 'لا توجد دورات',
                    subtitle: 'لم نجد دورات تطابق معايير البحث الخاصة بك',
                    action: 'تصفح جميع الدورات',
                },
            },

            // Course Detail
            courseDetail: {
                overview: 'نظرة عامة',
                curriculum: 'المنهج',
                instructor: 'المدرب',
                reviews: 'التقييمات',
                enroll: 'التسجيل في الدورة',
                enrolled: 'مسجل في الدورة',
                startLearning: 'بدء التعلم',
                whatYouWillLearn: 'ما ستتعلمه',
                requirements: 'المتطلبات',
                targetAudience: 'الجمهور المستهدف',
                courseIncludes: 'تشمل الدورة',
                videoContent: 'محتوى فيديو',
                downloadableResources: 'موارد قابلة للتحميل',
                fullLifetimeAccess: 'وصول مدى الحياة',
                certificateOfCompletion: 'شهادة إتمام',
                mobileAccess: 'وصول عبر الهاتف',
            },

            // Authentication
            auth: {
                login: {
                    title: 'تسجيل الدخول',
                    subtitle: 'مرحباً بعودتك إلى أكاديمية الأمل',
                    email: 'البريد الإلكتروني',
                    password: 'كلمة المرور',
                    remember: 'تذكرني',
                    forgot: 'نسيت كلمة المرور؟',
                    submit: 'تسجيل الدخول',
                    noAccount: 'ليس لديك حساب؟',
                    createAccount: 'إنشاء حساب جديد',
                },
                register: {
                    title: 'إنشاء حساب جديد',
                    subtitle: 'انضم إلى مجتمع أكاديمية الأمل',
                    firstName: 'الاسم الأول',
                    lastName: 'الاسم الأخير',
                    email: 'البريد الإلكتروني',
                    password: 'كلمة المرور',
                    confirmPassword: 'تأكيد كلمة المرور',
                    country: 'البلد',
                    city: 'المدينة',
                    profession: 'المهنة',
                    goals: 'أهدافك التعليمية',
                    terms: 'أوافق على الشروط والأحكام',
                    submit: 'إنشاء الحساب',
                    hasAccount: 'لديك حساب بالفعل؟',
                    signIn: 'تسجيل الدخول',
                },
                forgotPassword: {
                    title: 'نسيت كلمة المرور؟',
                    subtitle: 'أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين',
                    email: 'البريد الإلكتروني',
                    submit: 'إرسال رابط الإعادة',
                    backToLogin: 'العودة لتسجيل الدخول',
                },
            },

            // Dashboard
            dashboard: {
                welcome: 'مرحباً، {{name}}',
                subtitle: 'تابع رحلتك التعليمية',
                stats: {
                    enrolledCourses: 'الدورات المسجلة',
                    completedCourses: 'الدورات المكتملة',
                    totalWatchTime: 'وقت المشاهدة الإجمالي',
                    certificates: 'الشهادات',
                },
                continueWatching: 'متابعة المشاهدة',
                recentActivity: 'النشاط الأخير',
                recommendations: 'دورات مقترحة لك',
                achievements: 'الإنجازات',
                noEnrolledCourses: {
                    title: 'لم تسجل في أي دورة بعد',
                    subtitle: 'ابدأ رحلتك التعليمية بتصفح دوراتنا',
                    action: 'تصفح الدورات',
                },
            },

            // Video Player
            videoPlayer: {
                nextLesson: 'الدرس التالي',
                previousLesson: 'الدرس السابق',
                markComplete: 'تحديد كمكتمل',
                addBookmark: 'إضافة إشارة مرجعية',
                takeNotes: 'تدوين ملاحظات',
                downloadResources: 'تحميل الموارد',
                transcript: 'النص المكتوب',
                subtitles: 'الترجمة',
                playbackSpeed: 'سرعة التشغيل',
                quality: 'الجودة',
                fullscreen: 'ملء الشاشة',
                volume: 'الصوت',
                progress: 'التقدم',
            },

            // Profile
            profile: {
                title: 'الملف الشخصي',
                personalInfo: 'المعلومات الشخصية',
                learningPreferences: 'تفضيلات التعلم',
                achievements: 'الإنجازات',
                certificates: 'الشهادات',
                edit: 'تعديل الملف الشخصي',
                changePassword: 'تغيير كلمة المرور',
                deleteAccount: 'حذف الحساب',
                firstName: 'الاسم الأول',
                lastName: 'الاسم الأخير',
                email: 'البريد الإلكتروني',
                bio: 'نبذة شخصية',
                country: 'البلد',
                city: 'المدينة',
                profession: 'المهنة',
                experience: 'مستوى الخبرة',
                preferredLanguage: 'اللغة المفضلة',
                learningGoals: 'الأهداف التعليمية',
            },

            // Footer
            footer: {
                description: 'أكاديمية الأمل - منصة تعليمية مخصصة للمتعلمين السوريين لتطوير المهارات وبناء مستقبل أفضل',
                quickLinks: 'روابط سريعة',
                categories: 'التصنيفات',
                support: 'الدعم',
                legal: 'قانوني',
                followUs: 'تابعنا',
                newsletter: 'النشرة الإخبارية',
                newsletterText: 'اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والدورات',
                subscribe: 'اشتراك',
                copyright: '© {{year}} أكاديمية الأمل. جميع الحقوق محفوظة.',
            },

            // Search
            search: {
                title: 'البحث في الدورات',
                subtitle: 'اعثر على الدورة المثالية لتطوير مهاراتك',
                placeholder: 'ابحث عن دورات أو مواضيع أو مدربين...',
                filters: 'المرشحات',
                search: 'بحث',
                recent: 'عمليات البحث الأخيرة',
                popular: 'عمليات البحث الشائعة',
                resultsFor: 'نتائج البحث عن',
                coursesFound: 'دورة موجودة',
                sortBy: 'ترتيب حسب',
                relevance: 'الصلة',
                highestRated: 'الأعلى تقييماً',
                newest: 'الأحدث',
                mostPopular: 'الأكثر شعبية',
                category: 'التصنيف',
                allCategories: 'جميع التصنيفات',
                level: 'المستوى',
                allLevels: 'جميع المستويات',
                beginner: 'مبتدئ',
                intermediate: 'متوسط',
                advanced: 'متقدم',
                duration: 'المدة',
                anyDuration: 'أي مدة',
                short: 'أقل من 3 ساعات',
                medium: '3-10 ساعات',
                long: 'أكثر من 10 ساعات',
                rating: 'التقييم',
                anyRating: 'أي تقييم',
                rating45: '4.5+ نجوم',
                rating40: '4.0+ نجوم',
                rating35: '3.5+ نجوم',
                language: 'اللغة',
                allLanguages: 'جميع اللغات',
                english: 'الإنجليزية',
                arabic: 'العربية',
                noResults: 'لم يتم العثور على دورات',
                noResultsDesc: 'جرب تعديل مصطلحات البحث أو المرشحات',
                clearFilters: 'مسح المرشحات',
                startSearching: 'ابدأ البحث عن الدورات',
                searchDesc: 'أدخل كلمات مفتاحية للعثور على دورات تناسب اهتماماتك',
            },

            // Errors
            errors: {
                404: {
                    title: 'الصفحة غير موجودة',
                    subtitle: 'عذراً، الصفحة التي تبحث عنها غير موجودة',
                    action: 'العودة للرئيسية',
                },
                500: {
                    title: 'خطأ في الخادم',
                    subtitle: 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً',
                    action: 'إعادة المحاولة',
                },
                network: {
                    title: 'خطأ في الاتصال',
                    subtitle: 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى',
                    action: 'إعادة المحاولة',
                },
            },
        },
    },
    en: {
        translation: {
            // Common
            common: {
                loading: 'Loading...',
                error: 'Error occurred',
                success: 'Success',
                cancel: 'Cancel',
                save: 'Save',
                edit: 'Edit',
                delete: 'Delete',
                confirm: 'Confirm',
                back: 'Back',
                next: 'Next',
                previous: 'Previous',
                search: 'Search',
                filter: 'Filter',
                sort: 'Sort',
                view: 'View',
                download: 'Download',
                share: 'Share',
                like: 'Like',
                comment: 'Comment',
                subscribe: 'Subscribe',
                unsubscribe: 'Unsubscribe',
                login: 'Login',
                register: 'Register',
                logout: 'Logout',
                profile: 'Profile',
                settings: 'Settings',
                help: 'Help',
                about: 'About',
                contact: 'Contact',
                privacy: 'Privacy',
                terms: 'Terms & Conditions',
                darkMode: 'Dark Mode',
                lightMode: 'Light Mode',
            },

            // Meta
            meta: {
                title: 'Amal Academy - Educational Platform for Syrian Learners',
                description: 'Educational platform dedicated to Syrian learners to develop skills and build a better future through high-quality courses',
                keywords: 'education, syria, learning, skills, courses, arabic, english, career',
            },

            // Navigation
            nav: {
                home: 'Home',
                courses: 'Courses',
                categories: 'Categories',
                search: 'Search',
                about: 'About',
                contact: 'Contact',
                dashboard: 'Dashboard',
                myLearning: 'My Learning',
                profile: 'Profile',
                settings: 'Settings',
                admin: 'Admin',
            },

            // Home page
            home: {
                hero: {
                    title: 'Build Your Future with Amal Academy',
                    subtitle: 'Educational platform dedicated to Syrian learners for developing professional and personal skills',
                    cta: 'Start Learning Now',
                    watchIntro: 'Watch Intro Video',
                },
                features: {
                    title: 'Why Amal Academy?',
                    subtitle: 'We understand the challenges facing Syrian learners and provide solutions designed specifically for you',
                    items: {
                        bilingual: {
                            title: 'Bilingual Content',
                            description: 'Courses in both Arabic and English with comprehensive translation',
                        },
                        practical: {
                            title: 'Practical Skills',
                            description: 'Focus on skills required in the modern job market',
                        },
                        community: {
                            title: 'Supportive Community',
                            description: 'Connect with other learners and experienced mentors',
                        },
                        certificates: {
                            title: 'Certified Credentials',
                            description: 'Get internationally recognized completion certificates',
                        },
                        flexible: {
                            title: 'Flexible Learning',
                            description: 'Learn anytime, anywhere at your own pace',
                        },
                        affordable: {
                            title: 'Affordable',
                            description: 'Free and paid courses at accessible prices',
                        },
                    },
                },
                categories: {
                    title: 'Explore Categories',
                    subtitle: 'Choose the field that suits your career goals',
                    viewAll: 'View All Categories',
                },
                featured: {
                    title: 'Featured Courses',
                    subtitle: 'Carefully selected courses to develop your skills',
                    viewAll: 'View All Courses',
                },
                testimonials: {
                    title: 'Success Stories',
                    subtitle: 'Discover how Amal Academy changed learners\' lives',
                },
                cta: {
                    title: 'Start Your Learning Journey Today',
                    subtitle: 'Join thousands of learners developing their skills with Amal Academy',
                    button: 'Create Free Account',
                },
            },

            // Courses
            courses: {
                title: 'Training Courses',
                subtitle: 'Discover a wide range of courses designed to develop your skills',
                search: 'Search for a course...',
                filter: {
                    all: 'All Courses',
                    free: 'Free',
                    paid: 'Paid',
                    beginner: 'Beginner',
                    intermediate: 'Intermediate',
                    advanced: 'Advanced',
                    arabic: 'Arabic',
                    english: 'English',
                    both: 'Bilingual',
                },
                sort: {
                    newest: 'Newest',
                    oldest: 'Oldest',
                    popular: 'Most Popular',
                    rating: 'Highest Rated',
                    duration: 'Duration',
                },
                card: {
                    lessons: 'lessons',
                    hours: 'hours',
                    students: 'students',
                    rating: 'rating',
                    free: 'Free',
                    enroll: 'Enroll',
                    enrolled: 'Enrolled',
                    continue: 'Continue',
                    completed: 'Completed',
                },
                empty: {
                    title: 'No courses found',
                    subtitle: 'We couldn\'t find courses matching your search criteria',
                    action: 'Browse All Courses',
                },
            },

            // Course Detail
            courseDetail: {
                overview: 'Overview',
                curriculum: 'Curriculum',
                instructor: 'Instructor',
                reviews: 'Reviews',
                enroll: 'Enroll in Course',
                enrolled: 'Enrolled in Course',
                startLearning: 'Start Learning',
                whatYouWillLearn: 'What You\'ll Learn',
                requirements: 'Requirements',
                targetAudience: 'Target Audience',
                courseIncludes: 'Course Includes',
                videoContent: 'Video Content',
                downloadableResources: 'Downloadable Resources',
                fullLifetimeAccess: 'Full Lifetime Access',
                certificateOfCompletion: 'Certificate of Completion',
                mobileAccess: 'Mobile Access',
            },

            // Authentication
            auth: {
                login: {
                    title: 'Login',
                    subtitle: 'Welcome back to Amal Academy',
                    email: 'Email',
                    password: 'Password',
                    remember: 'Remember me',
                    forgot: 'Forgot password?',
                    submit: 'Login',
                    noAccount: 'Don\'t have an account?',
                    createAccount: 'Create new account',
                },
                register: {
                    title: 'Create New Account',
                    subtitle: 'Join the Amal Academy community',
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    email: 'Email',
                    password: 'Password',
                    confirmPassword: 'Confirm Password',
                    country: 'Country',
                    city: 'City',
                    profession: 'Profession',
                    goals: 'Learning Goals',
                    terms: 'I agree to the Terms and Conditions',
                    submit: 'Create Account',
                    hasAccount: 'Already have an account?',
                    signIn: 'Sign In',
                },
                forgotPassword: {
                    title: 'Forgot Password?',
                    subtitle: 'Enter your email and we\'ll send you a reset link',
                    email: 'Email',
                    submit: 'Send Reset Link',
                    backToLogin: 'Back to Login',
                },
            },

            // Dashboard
            dashboard: {
                welcome: 'Welcome, {{name}}',
                subtitle: 'Continue your learning journey',
                stats: {
                    enrolledCourses: 'Enrolled Courses',
                    completedCourses: 'Completed Courses',
                    totalWatchTime: 'Total Watch Time',
                    certificates: 'Certificates',
                },
                continueWatching: 'Continue Watching',
                recentActivity: 'Recent Activity',
                recommendations: 'Recommended for You',
                achievements: 'Achievements',
                noEnrolledCourses: {
                    title: 'No enrolled courses yet',
                    subtitle: 'Start your learning journey by browsing our courses',
                    action: 'Browse Courses',
                },
            },

            // Video Player
            videoPlayer: {
                nextLesson: 'Next Lesson',
                previousLesson: 'Previous Lesson',
                markComplete: 'Mark as Complete',
                addBookmark: 'Add Bookmark',
                takeNotes: 'Take Notes',
                downloadResources: 'Download Resources',
                transcript: 'Transcript',
                subtitles: 'Subtitles',
                playbackSpeed: 'Playback Speed',
                quality: 'Quality',
                fullscreen: 'Fullscreen',
                volume: 'Volume',
                progress: 'Progress',
            },

            // Profile
            profile: {
                title: 'Profile',
                personalInfo: 'Personal Information',
                learningPreferences: 'Learning Preferences',
                achievements: 'Achievements',
                certificates: 'Certificates',
                edit: 'Edit Profile',
                changePassword: 'Change Password',
                deleteAccount: 'Delete Account',
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'Email',
                bio: 'Bio',
                country: 'Country',
                city: 'City',
                profession: 'Profession',
                experience: 'Experience Level',
                preferredLanguage: 'Preferred Language',
                learningGoals: 'Learning Goals',
            },

            // Footer
            footer: {
                description: 'Amal Academy - Educational platform dedicated to Syrian learners to develop skills and build a better future',
                quickLinks: 'Quick Links',
                categories: 'Categories',
                support: 'Support',
                legal: 'Legal',
                followUs: 'Follow Us',
                newsletter: 'Newsletter',
                newsletterText: 'Subscribe to our newsletter for latest news and courses',
                subscribe: 'Subscribe',
                copyright: '© {{year}} Amal Academy. All rights reserved.',
            },

            // Search
            search: {
                title: 'Search Courses',
                subtitle: 'Find the perfect course to advance your skills',
                placeholder: 'Search for courses, topics, or instructors...',
                filters: 'Filters',
                search: 'Search',
                recent: 'Recent Searches',
                popular: 'Popular Searches',
                resultsFor: 'Results for',
                coursesFound: 'courses found',
                sortBy: 'Sort by',
                relevance: 'Relevance',
                highestRated: 'Highest Rated',
                newest: 'Newest',
                mostPopular: 'Most Popular',
                category: 'Category',
                allCategories: 'All Categories',
                level: 'Level',
                allLevels: 'All Levels',
                beginner: 'Beginner',
                intermediate: 'Intermediate',
                advanced: 'Advanced',
                duration: 'Duration',
                anyDuration: 'Any Duration',
                short: '< 3 hours',
                medium: '3-10 hours',
                long: '> 10 hours',
                rating: 'Rating',
                anyRating: 'Any Rating',
                rating45: '4.5+ Stars',
                rating40: '4.0+ Stars',
                rating35: '3.5+ Stars',
                language: 'Language',
                allLanguages: 'All Languages',
                english: 'English',
                arabic: 'Arabic',
                noResults: 'No courses found',
                noResultsDesc: 'Try adjusting your search terms or filters',
                clearFilters: 'Clear Filters',
                startSearching: 'Start searching for courses',
                searchDesc: 'Enter keywords to find courses that match your interests',
            },

            // Errors
            errors: {
                404: {
                    title: 'Page Not Found',
                    subtitle: 'Sorry, the page you are looking for does not exist',
                    action: 'Go Home',
                },
                500: {
                    title: 'Server Error',
                    subtitle: 'An unexpected error occurred, please try again later',
                    action: 'Try Again',
                },
                network: {
                    title: 'Connection Error',
                    subtitle: 'Check your internet connection and try again',
                    action: 'Try Again',
                },
            },
        },
    },
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ar',
        debug: true, // Enable debug to see what's happening

        detection: {
            order: ['localStorage', 'htmlTag', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'amal-language',
        },

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        },
    })
    .then(() => {
        console.log('i18n initialized successfully')
        console.log('Current language:', i18n.language)
        console.log('Available resources:', Object.keys(i18n.store.data))
    })
    .catch((error) => {
        console.error('i18n initialization failed:', error)
    })

export default i18n