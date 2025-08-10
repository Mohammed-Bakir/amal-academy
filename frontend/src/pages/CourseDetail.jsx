import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    FiPlay, FiClock, FiUsers, FiStar, FiBookOpen, FiDownload,
    FiShare2, FiHeart, FiCheck, FiLock, FiArrowLeft, FiArrowRight
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import { useAuth } from '@contexts/AuthContext'
import LoadingSpinner from '@components/common/LoadingSpinner'
import api from '@services/api'

// Mock course data
const mockCourseData = {
    'intro-programming': {
        id: 'intro-programming',
        title: { en: 'Introduction to Programming', ar: 'مقدمة في البرمجة' },
        description: {
            en: 'Learn the fundamentals of programming with practical examples and hands-on projects. This comprehensive course covers programming concepts, problem-solving techniques, and best practices.',
            ar: 'تعلم أساسيات البرمجة مع أمثلة عملية ومشاريع تطبيقية. تغطي هذه الدورة الشاملة مفاهيم البرمجة وتقنيات حل المشكلات وأفضل الممارسات.'
        },
        instructor: {
            name: { en: 'Ahmad Hassan', ar: 'أحمد حسن' },
            title: { en: 'Senior Software Engineer', ar: 'مهندس برمجيات أول' },
            bio: {
                en: 'Ahmad has 8+ years of experience in software development and has taught programming to over 5,000 students.',
                ar: 'أحمد لديه خبرة أكثر من 8 سنوات في تطوير البرمجيات وقد علم البرمجة لأكثر من 5000 طالب.'
            },
            avatar: 'https://ui-avatars.com/api/?name=Ahmad+Hassan&background=2563eb&color=fff&size=100',
            rating: 4.9,
            students: 12500
        },
        duration: '8 hours',
        totalStudents: 1250,
        rating: 4.8,
        totalRatings: 324,
        level: { en: 'Beginner', ar: 'مبتدئ' },
        category: { en: 'Programming', ar: 'البرمجة' },
        price: 'Free',
        language: { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
        lastUpdated: '2024-01-15',
        thumbnail: 'https://picsum.photos/800/450?random=10',
        previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        features: [
            { en: 'Lifetime access', ar: 'وصول مدى الحياة' },
            { en: 'Mobile and desktop access', ar: 'وصول من الجوال والكمبيوتر' },
            { en: 'Certificate of completion', ar: 'شهادة إتمام' },
            { en: 'Downloadable resources', ar: 'موارد قابلة للتحميل' }
        ],
        curriculum: [
            {
                id: 1,
                title: { en: 'Getting Started', ar: 'البداية' },
                duration: '45 min',
                lessons: [
                    {
                        id: 1,
                        title: { en: 'Welcome to Programming', ar: 'مرحباً بك في البرمجة' },
                        duration: '5 min',
                        type: 'video',
                        free: true
                    },
                    {
                        id: 2,
                        title: { en: 'Setting up Development Environment', ar: 'إعداد بيئة التطوير' },
                        duration: '15 min',
                        type: 'video',
                        free: true
                    },
                    {
                        id: 3,
                        title: { en: 'Your First Program', ar: 'برنامجك الأول' },
                        duration: '25 min',
                        type: 'video',
                        free: false
                    }
                ]
            },
            {
                id: 2,
                title: { en: 'Programming Fundamentals', ar: 'أساسيات البرمجة' },
                duration: '2 hours',
                lessons: [
                    {
                        id: 4,
                        title: { en: 'Variables and Data Types', ar: 'المتغيرات وأنواع البيانات' },
                        duration: '30 min',
                        type: 'video',
                        free: false
                    },
                    {
                        id: 5,
                        title: { en: 'Control Structures', ar: 'هياكل التحكم' },
                        duration: '45 min',
                        type: 'video',
                        free: false
                    },
                    {
                        id: 6,
                        title: { en: 'Functions and Methods', ar: 'الدوال والطرق' },
                        duration: '45 min',
                        type: 'video',
                        free: false
                    }
                ]
            },
            {
                id: 3,
                title: { en: 'Practical Projects', ar: 'مشاريع عملية' },
                duration: '3 hours',
                lessons: [
                    {
                        id: 7,
                        title: { en: 'Calculator Project', ar: 'مشروع الآلة الحاسبة' },
                        duration: '60 min',
                        type: 'video',
                        free: false
                    },
                    {
                        id: 8,
                        title: { en: 'To-Do List Application', ar: 'تطبيق قائمة المهام' },
                        duration: '90 min',
                        type: 'video',
                        free: false
                    },
                    {
                        id: 9,
                        title: { en: 'Final Project', ar: 'المشروع النهائي' },
                        duration: '30 min',
                        type: 'assignment',
                        free: false
                    }
                ]
            }
        ],
        requirements: [
            { en: 'No prior programming experience required', ar: 'لا تحتاج خبرة سابقة في البرمجة' },
            { en: 'Computer with internet connection', ar: 'جهاز كمبيوتر مع اتصال بالإنترنت' },
            { en: 'Willingness to learn and practice', ar: 'الرغبة في التعلم والممارسة' }
        ],
        whatYouWillLearn: [
            { en: 'Understand programming fundamentals', ar: 'فهم أساسيات البرمجة' },
            { en: 'Write clean and efficient code', ar: 'كتابة كود نظيف وفعال' },
            { en: 'Solve problems using programming', ar: 'حل المشاكل باستخدام البرمجة' },
            { en: 'Build real-world projects', ar: 'بناء مشاريع حقيقية' }
        ]
    },
    'web-dev-bootcamp': {
        id: 'web-dev-bootcamp',
        title: { en: 'Web Development Bootcamp', ar: 'معسكر تطوير المواقع' },
        description: {
            en: 'Master modern web development with HTML, CSS, JavaScript, and React. Build real-world projects and deploy them to production.',
            ar: 'أتقن تطوير المواقع الحديثة باستخدام HTML و CSS و JavaScript و React. ابني مشاريع حقيقية وانشرها على الإنترنت.'
        },
        instructor: {
            name: { en: 'Sarah Johnson', ar: 'سارة جونسون' },
            title: { en: 'Full Stack Developer', ar: 'مطورة مكدس كامل' },
            bio: {
                en: 'Sarah is a senior full-stack developer with 10+ years of experience building scalable web applications.',
                ar: 'سارة مطورة مكدس كامل أولى مع خبرة أكثر من 10 سنوات في بناء تطبيقات الويب القابلة للتوسع.'
            },
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff&size=100',
            rating: 4.9,
            students: 8500
        },
        duration: '12 hours',
        totalStudents: 2100,
        rating: 4.7,
        totalRatings: 456,
        level: { en: 'Intermediate', ar: 'متوسط' },
        category: { en: 'Web Development', ar: 'تطوير المواقع' },
        price: 'Free',
        language: { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
        lastUpdated: '2024-01-20',
        thumbnail: 'https://picsum.photos/800/450?random=20',
        previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        features: [
            { en: 'Lifetime access', ar: 'وصول مدى الحياة' },
            { en: 'Mobile and desktop access', ar: 'وصول من الجوال والكمبيوتر' },
            { en: 'Certificate of completion', ar: 'شهادة إتمام' },
            { en: 'Downloadable resources', ar: 'موارد قابلة للتحميل' }
        ],
        curriculum: [
            {
                id: 1,
                title: { en: 'HTML Fundamentals', ar: 'أساسيات HTML' },
                duration: '2 hours',
                lessons: [
                    {
                        id: 1,
                        title: { en: 'Introduction to HTML', ar: 'مقدمة في HTML' },
                        duration: '30 min',
                        type: 'video',
                        free: true
                    },
                    {
                        id: 2,
                        title: { en: 'HTML Elements and Tags', ar: 'عناصر وعلامات HTML' },
                        duration: '45 min',
                        type: 'video',
                        free: false
                    }
                ]
            },
            {
                id: 2,
                title: { en: 'CSS Styling', ar: 'تنسيق CSS' },
                duration: '3 hours',
                lessons: [
                    {
                        id: 3,
                        title: { en: 'CSS Basics', ar: 'أساسيات CSS' },
                        duration: '45 min',
                        type: 'video',
                        free: false
                    },
                    {
                        id: 4,
                        title: { en: 'Responsive Design', ar: 'التصميم المتجاوب' },
                        duration: '60 min',
                        type: 'video',
                        free: false
                    }
                ]
            }
        ],
        requirements: [
            { en: 'Basic computer skills', ar: 'مهارات أساسية في الكمبيوتر' },
            { en: 'Internet connection', ar: 'اتصال بالإنترنت' },
            { en: 'Text editor or IDE', ar: 'محرر نصوص أو بيئة تطوير' }
        ],
        whatYouWillLearn: [
            { en: 'Build responsive websites', ar: 'بناء مواقع متجاوبة' },
            { en: 'Master modern JavaScript', ar: 'إتقان JavaScript الحديثة' },
            { en: 'Work with React framework', ar: 'العمل مع إطار React' },
            { en: 'Deploy applications to production', ar: 'نشر التطبيقات للإنتاج' }
        ]
    },
    'ui-ux-design': {
        id: 'ui-ux-design',
        title: { en: 'UI/UX Design Masterclass', ar: 'دورة تصميم واجهات المستخدم' },
        description: {
            en: 'Learn the principles of user interface and user experience design. Create beautiful and functional designs that users love.',
            ar: 'تعلم مبادئ تصميم واجهة المستخدم وتجربة المستخدم. أنشئ تصاميم جميلة وعملية يحبها المستخدمون.'
        },
        instructor: {
            name: { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
            title: { en: 'Senior UI/UX Designer', ar: 'مصمم واجهات أول' },
            bio: {
                en: 'Ahmed is a creative designer with expertise in user-centered design and modern design tools with 7+ years of experience.',
                ar: 'أحمد مصمم مبدع مع خبرة في التصميم المتمحور حول المستخدم وأدوات التصميم الحديثة مع خبرة أكثر من 7 سنوات.'
            },
            avatar: 'https://ui-avatars.com/api/?name=Ahmed+Al-Rashid&background=8b5cf6&color=fff&size=100',
            rating: 4.8,
            students: 3200
        },
        duration: '10 hours',
        totalStudents: 1800,
        rating: 4.9,
        totalRatings: 287,
        level: { en: 'Beginner', ar: 'مبتدئ' },
        category: { en: 'Design', ar: 'التصميم' },
        price: 'Free',
        language: { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
        lastUpdated: '2024-01-18',
        thumbnail: 'https://picsum.photos/800/450?random=30',
        previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        features: [
            { en: 'Lifetime access', ar: 'وصول مدى الحياة' },
            { en: 'Design templates included', ar: 'قوالب تصميم مضمنة' },
            { en: 'Certificate of completion', ar: 'شهادة إتمام' },
            { en: 'Community access', ar: 'وصول للمجتمع' }
        ],
        curriculum: [
            {
                id: 1,
                title: { en: 'Design Principles', ar: 'مبادئ التصميم' },
                duration: '3 hours',
                lessons: [
                    {
                        id: 1,
                        title: { en: 'Introduction to Design', ar: 'مقدمة في التصميم' },
                        duration: '45 min',
                        type: 'video',
                        free: true
                    },
                    {
                        id: 2,
                        title: { en: 'Color Theory', ar: 'نظرية الألوان' },
                        duration: '60 min',
                        type: 'video',
                        free: false
                    }
                ]
            },
            {
                id: 2,
                title: { en: 'User Experience Design', ar: 'تصميم تجربة المستخدم' },
                duration: '4 hours',
                lessons: [
                    {
                        id: 3,
                        title: { en: 'User Research', ar: 'بحث المستخدمين' },
                        duration: '90 min',
                        type: 'video',
                        free: false
                    },
                    {
                        id: 4,
                        title: { en: 'Wireframing', ar: 'الإطارات الشبكية' },
                        duration: '75 min',
                        type: 'video',
                        free: false
                    }
                ]
            }
        ],
        requirements: [
            { en: 'Creative mindset', ar: 'عقلية إبداعية' },
            { en: 'Computer with design software access', ar: 'كمبيوتر مع إمكانية الوصول لبرامج التصميم' },
            { en: 'Basic understanding of digital tools', ar: 'فهم أساسي للأدوات الرقمية' }
        ],
        whatYouWillLearn: [
            { en: 'Master design thinking process', ar: 'إتقان عملية التفكير التصميمي' },
            { en: 'Create user personas and journeys', ar: 'إنشاء شخصيات ورحلات المستخدمين' },
            { en: 'Design and prototype interfaces', ar: 'تصميم ونمذجة الواجهات' },
            { en: 'Conduct usability testing', ar: 'إجراء اختبارات قابلية الاستخدام' }
        ]
    },
    'digital-marketing': {
        id: 'digital-marketing',
        title: { en: 'Digital Marketing Strategy', ar: 'استراتيجية التسويق الرقمي' },
        description: {
            en: 'Learn effective digital marketing techniques and social media strategies to grow your business online.',
            ar: 'تعلم تقنيات التسويق الرقمي الفعالة واستراتيجيات وسائل التواصل لتنمية عملك على الإنترنت.'
        },
        instructor: {
            name: { en: 'Omar Khalil', ar: 'عمر خليل' },
            title: { en: 'Digital Marketing Expert', ar: 'خبير التسويق الرقمي' },
            bio: {
                en: 'Omar has 6+ years of experience in digital marketing and has helped hundreds of businesses grow online.',
                ar: 'عمر لديه خبرة أكثر من 6 سنوات في التسويق الرقمي وساعد مئات الشركات على النمو عبر الإنترنت.'
            },
            avatar: 'https://ui-avatars.com/api/?name=Omar+Khalil&background=f59e0b&color=fff&size=100',
            rating: 4.9,
            students: 2100
        },
        duration: '6 hours',
        totalStudents: 2100,
        rating: 4.9,
        totalRatings: 234,
        level: { en: 'Beginner', ar: 'مبتدئ' },
        category: { en: 'Marketing', ar: 'التسويق' },
        price: 'Free',
        language: { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
        lastUpdated: '2024-01-22',
        thumbnail: 'https://picsum.photos/800/450?random=40',
        previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        features: [
            { en: 'Lifetime access', ar: 'وصول مدى الحياة' },
            { en: 'Mobile and desktop access', ar: 'وصول من الجوال والكمبيوتر' },
            { en: 'Certificate of completion', ar: 'شهادة إتمام' },
            { en: 'Marketing templates included', ar: 'قوالب تسويقية مضمنة' }
        ],
        curriculum: [
            {
                id: 1,
                title: { en: 'Digital Marketing Basics', ar: 'أساسيات التسويق الرقمي' },
                duration: '2 hours',
                lessons: [
                    {
                        id: 1,
                        title: { en: 'Introduction to Digital Marketing', ar: 'مقدمة في التسويق الرقمي' },
                        duration: '30 min',
                        type: 'video',
                        free: true
                    },
                    {
                        id: 2,
                        title: { en: 'Understanding Your Audience', ar: 'فهم جمهورك المستهدف' },
                        duration: '45 min',
                        type: 'video',
                        free: false
                    }
                ]
            }
        ],
        requirements: [
            { en: 'Basic computer skills', ar: 'مهارات أساسية في الكمبيوتر' },
            { en: 'Internet connection', ar: 'اتصال بالإنترنت' },
            { en: 'Willingness to learn marketing', ar: 'الرغبة في تعلم التسويق' }
        ],
        whatYouWillLearn: [
            { en: 'Create effective marketing campaigns', ar: 'إنشاء حملات تسويقية فعالة' },
            { en: 'Use social media for business', ar: 'استخدام وسائل التواصل للأعمال' },
            { en: 'Analyze marketing performance', ar: 'تحليل أداء التسويق' },
            { en: 'Build brand awareness', ar: 'بناء الوعي بالعلامة التجارية' }
        ]
    },
    'data-science-python': {
        id: 'data-science-python',
        title: { en: 'Data Science with Python', ar: 'علم البيانات باستخدام بايثون' },
        description: {
            en: 'Analyze data and build machine learning models with Python. Learn pandas, numpy, and scikit-learn.',
            ar: 'حلل البيانات وابني نماذج التعلم الآلي باستخدام بايثون. تعلم pandas و numpy و scikit-learn.'
        },
        instructor: {
            name: { en: 'Mahmoud Ali', ar: 'محمود علي' },
            title: { en: 'Data Scientist', ar: 'عالم بيانات' },
            bio: {
                en: 'Mahmoud is a senior data scientist with 8+ years of experience in machine learning and data analysis.',
                ar: 'محمود عالم بيانات أول مع خبرة أكثر من 8 سنوات في التعلم الآلي وتحليل البيانات.'
            },
            avatar: 'https://ui-avatars.com/api/?name=Mahmoud+Ali&background=6366f1&color=fff&size=100',
            rating: 4.5,
            students: 567
        },
        duration: '15 hours',
        totalStudents: 567,
        rating: 4.5,
        totalRatings: 78,
        level: { en: 'Advanced', ar: 'متقدم' },
        category: { en: 'Data Science', ar: 'علم البيانات' },
        price: 'Free',
        language: { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
        lastUpdated: '2024-01-25',
        thumbnail: 'https://picsum.photos/800/450?random=50',
        previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        features: [
            { en: 'Lifetime access', ar: 'وصول مدى الحياة' },
            { en: 'Python code examples', ar: 'أمثلة كود بايثون' },
            { en: 'Certificate of completion', ar: 'شهادة إتمام' },
            { en: 'Dataset downloads', ar: 'تحميل مجموعات البيانات' }
        ],
        curriculum: [
            {
                id: 1,
                title: { en: 'Python for Data Science', ar: 'بايثون لعلم البيانات' },
                duration: '5 hours',
                lessons: [
                    {
                        id: 1,
                        title: { en: 'Python Basics Review', ar: 'مراجعة أساسيات بايثون' },
                        duration: '60 min',
                        type: 'video',
                        free: true
                    },
                    {
                        id: 2,
                        title: { en: 'NumPy and Pandas', ar: 'NumPy و Pandas' },
                        duration: '90 min',
                        type: 'video',
                        free: false
                    }
                ]
            }
        ],
        requirements: [
            { en: 'Basic Python knowledge', ar: 'معرفة أساسية ببايثون' },
            { en: 'Mathematics background', ar: 'خلفية في الرياضيات' },
            { en: 'Computer with Python installed', ar: 'كمبيوتر مع بايثون مثبت' }
        ],
        whatYouWillLearn: [
            { en: 'Data analysis with pandas', ar: 'تحليل البيانات مع pandas' },
            { en: 'Machine learning models', ar: 'نماذج التعلم الآلي' },
            { en: 'Data visualization', ar: 'تصور البيانات' },
            { en: 'Statistical analysis', ar: 'التحليل الإحصائي' }
        ]
    }
}

const CourseDetail = () => {
    const { slug } = useParams()
    const id = slug // Use slug as id for now
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { user, isAuthenticated } = useAuth()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [expandedSection, setExpandedSection] = useState(null)
    const [isEnrolled, setIsEnrolled] = useState(false)

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true)

                // Try to fetch real course data first
                const response = await api.get(`/courses/slug/${id}`)
                if (response.data.success) {
                    const courseData = response.data.course

                    // Fetch course videos using public API
                    let videos = [];
                    try {
                        const videosResponse = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/videos/course/${courseData._id}/public`)
                        const videosData = await videosResponse.json()
                        videos = (videosData.success && videosData.videos) ? videosData.videos : []
                    } catch (error) {
                        console.error('Failed to fetch videos:', error)
                        videos = []
                    }

                    // Transform to match expected structure
                    const transformedCourse = {
                        id: courseData._id,
                        slug: courseData.slug,
                        title: {
                            en: courseData.title,
                            ar: courseData.titleArabic || courseData.title
                        },
                        description: {
                            en: courseData.description,
                            ar: courseData.descriptionArabic || courseData.description
                        },
                        instructor: {
                            name: {
                                en: `${courseData.instructor?.firstName} ${courseData.instructor?.lastName}`,
                                ar: `${courseData.instructor?.firstName} ${courseData.instructor?.lastName}`
                            },
                            title: { en: 'Instructor', ar: 'مدرب' },
                            bio: {
                                en: courseData.instructor?.bio || 'Experienced instructor',
                                ar: courseData.instructor?.bio || 'مدرب ذو خبرة'
                            },
                            avatar: `https://ui-avatars.com/api/?name=${courseData.instructor?.firstName}+${courseData.instructor?.lastName}&background=2563eb&color=fff&size=100`,
                            rating: 4.9,
                            students: 12500
                        },
                        duration: `${Math.floor(courseData.duration / 60)} hours`,
                        totalStudents: courseData.totalEnrollments || 0,
                        rating: courseData.averageRating || 4.5,
                        totalRatings: courseData.totalRatings || 0,
                        level: {
                            en: courseData.level.charAt(0).toUpperCase() + courseData.level.slice(1),
                            ar: courseData.level === 'beginner' ? 'مبتدئ' : courseData.level === 'intermediate' ? 'متوسط' : 'متقدم'
                        },
                        category: {
                            en: courseData.category?.name || 'Programming',
                            ar: courseData.category?.nameArabic || 'البرمجة'
                        },
                        price: courseData.pricing?.type === 'free' ? 'Free' : `$${courseData.pricing?.price}`,
                        language: { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
                        lastUpdated: new Date(courseData.updatedAt).toISOString().split('T')[0],
                        thumbnail: courseData.thumbnail,
                        previewVideo: videos[0]?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        features: [
                            { en: 'Lifetime access', ar: 'وصول مدى الحياة' },
                            { en: 'Mobile and desktop access', ar: 'وصول من الجوال والكمبيوتر' },
                            { en: 'Certificate of completion', ar: 'شهادة إتمام' },
                            { en: 'Downloadable resources', ar: 'موارد قابلة للتحميل' }
                        ],
                        videos: videos, // Store videos for easy access
                        curriculum: [{
                            id: 1,
                            title: { en: 'Course Content', ar: 'محتوى الدورة' },
                            duration: `${Math.floor(courseData.duration / 60)} hours`,
                            lessons: videos.map((video, index) => ({
                                id: video._id,
                                title: {
                                    en: video.title,
                                    ar: video.titleArabic || video.title
                                },
                                duration: `${Math.floor(video.duration / 60)} min`,
                                type: 'video',
                                free: video.isPreview || index === 0,
                                videoId: video._id,
                                slug: video.slug
                            }))
                        }]
                    }

                    setCourse(transformedCourse)
                    setIsEnrolled(true) // For free courses, always show Start Learning
                } else {
                    // Fallback to mock data
                    const courseData = mockCourseData[id]
                    if (courseData) {
                        setCourse(courseData)
                        setIsEnrolled(true)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch course data:', error)
                // Fallback to mock data
                const courseData = mockCourseData[id]
                if (courseData) {
                    setCourse(courseData)
                    setIsEnrolled(true)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCourseData()
    }, [id, isAuthenticated, slug])

    const handleEnroll = () => {
        if (!isAuthenticated) {
            // Redirect to login
            return
        }
        setIsEnrolled(true)
        // Handle enrollment logic
    }

    const toggleSection = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        )
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                        {isArabic ? 'الدورة غير موجودة' : 'Course Not Found'}
                    </h2>
                    <Link to="/courses" className="btn btn-primary">
                        {isArabic ? 'العودة للدورات' : 'Back to Courses'}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-secondary-900 dark:bg-gray-800 text-white">
                <div className="container py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm mb-4">
                                <Link to="/courses" className="text-secondary-300 hover:text-white">
                                    {t('nav.courses')}
                                </Link>
                                <span className="text-secondary-500">/</span>
                                <span className="text-white">{course.title[isArabic ? 'ar' : 'en']}</span>
                            </nav>

                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {course.title[isArabic ? 'ar' : 'en']}
                            </h1>

                            <p className="text-lg text-secondary-300 mb-6">
                                {course.description[isArabic ? 'ar' : 'en']}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    <FiStar className="text-yellow-400 w-5 h-5 mr-1" />
                                    <span className="font-semibold mr-1">{course.rating}</span>
                                    <span className="text-secondary-300">({course.totalRatings} {isArabic ? 'تقييم' : 'ratings'})</span>
                                </div>
                                <div className="flex items-center">
                                    <FiUsers className="w-5 h-5 mr-1" />
                                    <span>{course.totalStudents.toLocaleString()} {isArabic ? 'طالب' : 'students'}</span>
                                </div>
                                <div className="flex items-center">
                                    <FiClock className="w-5 h-5 mr-1" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <img
                                    src={course.instructor.avatar}
                                    alt={course.instructor.name[isArabic ? 'ar' : 'en']}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{course.instructor.name[isArabic ? 'ar' : 'en']}</p>
                                    <p className="text-sm text-secondary-300">{course.instructor.title[isArabic ? 'ar' : 'en']}</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Preview */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg sticky top-4">
                                <div className="relative">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title[isArabic ? 'ar' : 'en']}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                                            <FiPlay className="text-primary-600 text-2xl ml-1" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                            {course.price === 'Free' ? (isArabic ? 'مجاني' : 'Free') : course.price}
                                        </div>
                                    </div>

                                    {isEnrolled ? (
                                        <Link
                                            to={(() => {
                                                // Map course slugs to their first video slugs
                                                const firstVideoMap = {
                                                    'javascript-fundamentals': 'welcome-to-javascript',
                                                    'react-development': 'react-components',
                                                    'ui-ux-design': 'design-principles'
                                                };
                                                const firstVideoSlug = firstVideoMap[course.slug] || 'welcome-to-javascript';
                                                const url = `/watch/${course.slug}/${firstVideoSlug}`;
                                                console.log('Start Learning URL:', url);
                                                return url;
                                            })()}
                                            className="btn btn-primary w-full mb-4"
                                        >
                                            <FiPlay className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                            {isArabic ? 'بدء التعلم' : 'Start Learning'}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleEnroll}
                                            className="btn btn-primary w-full mb-4"
                                        >
                                            {isArabic ? 'التسجيل في الدورة' : 'Enroll Now'}
                                        </button>
                                    )}

                                    <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-6">
                                        <button className="p-2 text-secondary-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                            <FiHeart className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-secondary-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                            <FiShare2 className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-secondary-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                            <FiDownload className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-3 text-sm text-secondary-700 dark:text-gray-300">
                                        {(course.features || []).map((feature, index) => (
                                            <div key={index} className="flex items-center">
                                                <FiCheck className="text-green-500 dark:text-green-400 w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                <span>{feature[isArabic ? 'ar' : 'en']}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
                            <div className="border-b border-secondary-200 dark:border-gray-700">
                                <nav className="flex space-x-8 rtl:space-x-reverse px-6">
                                    {[
                                        { id: 'overview', label: isArabic ? 'نظرة عامة' : 'Overview' },
                                        { id: 'curriculum', label: isArabic ? 'المنهج' : 'Curriculum' },
                                        { id: 'instructor', label: isArabic ? 'المدرب' : 'Instructor' },
                                        { id: 'reviews', label: isArabic ? 'التقييمات' : 'Reviews' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                                : 'border-transparent text-secondary-500 dark:text-gray-400 hover:text-secondary-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">
                                                {isArabic ? 'ما ستتعلمه' : 'What you\'ll learn'}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {(course.whatYouWillLearn || []).map((item, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <FiCheck className="text-green-500 dark:text-green-400 w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 mt-0.5 flex-shrink-0" />
                                                        <span className="text-secondary-700 dark:text-gray-300">{item[isArabic ? 'ar' : 'en']}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">
                                                {isArabic ? 'المتطلبات' : 'Requirements'}
                                            </h3>
                                            <ul className="space-y-2">
                                                {(course.requirements || []).map((req, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="w-2 h-2 bg-secondary-400 dark:bg-gray-500 rounded-full mt-2 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0"></span>
                                                        <span className="text-secondary-700 dark:text-gray-300">{req[isArabic ? 'ar' : 'en']}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Curriculum Tab */}
                                {activeTab === 'curriculum' && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-white">
                                            {isArabic ? 'محتوى الدورة' : 'Course Content'}
                                        </h3>
                                        <div className="space-y-4">
                                            {(course.curriculum || []).map((section) => (
                                                <div key={section.id} className="border border-secondary-200 dark:border-gray-600 rounded-lg">
                                                    <button
                                                        onClick={() => toggleSection(section.id)}
                                                        className="w-full px-4 py-3 text-left rtl:text-right flex items-center justify-between hover:bg-secondary-50 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <div>
                                                            <h4 className="font-medium text-secondary-900 dark:text-white">{section.title[isArabic ? 'ar' : 'en']}</h4>
                                                            <p className="text-sm text-secondary-600 dark:text-gray-400">
                                                                {section.lessons.length} {isArabic ? 'درس' : 'lessons'} • {section.duration}
                                                            </p>
                                                        </div>
                                                        {expandedSection === section.id ? (
                                                            <FiArrowLeft className="w-5 h-5 transform rotate-90 text-secondary-600 dark:text-gray-400" />
                                                        ) : (
                                                            <FiArrowRight className="w-5 h-5 text-secondary-600 dark:text-gray-400" />
                                                        )}
                                                    </button>

                                                    {expandedSection === section.id && (
                                                        <div className="border-t border-secondary-200 dark:border-gray-600">
                                                            {(section.lessons || []).map((lesson) => {
                                                                const canWatch = lesson.free || isEnrolled;
                                                                const LessonComponent = canWatch ? Link : 'div';
                                                                const lessonProps = canWatch ? {
                                                                    to: `/watch/${course.slug}/${lesson.slug || lesson.videoId || lesson.id}`,
                                                                    className: "px-4 py-3 flex items-center justify-between hover:bg-secondary-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                                                } : {
                                                                    className: "px-4 py-3 flex items-center justify-between opacity-60"
                                                                };

                                                                return (
                                                                    <LessonComponent key={lesson.id} {...lessonProps}>
                                                                        <div className="flex items-center">
                                                                            {lesson.free ? (
                                                                                <FiPlay className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-3 rtl:mr-0 rtl:ml-3" />
                                                                            ) : (
                                                                                <FiLock className="w-4 h-4 text-secondary-400 dark:text-gray-500 mr-3 rtl:mr-0 rtl:ml-3" />
                                                                            )}
                                                                            <span className="text-sm text-secondary-700 dark:text-gray-300">{lesson.title[isArabic ? 'ar' : 'en']}</span>
                                                                        </div>
                                                                        <div className="flex items-center text-sm text-secondary-600 dark:text-gray-400">
                                                                            <span>{lesson.duration}</span>
                                                                            {lesson.free && (
                                                                                <span className="ml-2 rtl:ml-0 rtl:mr-2 text-primary-600 dark:text-primary-400 font-medium">
                                                                                    {isArabic ? 'معاينة' : 'Preview'}
                                                                                </span>
                                                                            )}
                                                                            {canWatch && (
                                                                                <FiArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 text-primary-600 dark:text-primary-400" />
                                                                            )}
                                                                        </div>
                                                                    </LessonComponent>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Instructor Tab */}
                                {activeTab === 'instructor' && (
                                    <div>
                                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                            <img
                                                src={course.instructor.avatar}
                                                alt={course.instructor.name[isArabic ? 'ar' : 'en']}
                                                className="w-20 h-20 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold mb-1 text-secondary-900 dark:text-white">
                                                    {course.instructor.name[isArabic ? 'ar' : 'en']}
                                                </h3>
                                                <p className="text-secondary-600 dark:text-gray-400 mb-4">
                                                    {course.instructor.title[isArabic ? 'ar' : 'en']}
                                                </p>
                                                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                                                    <div className="flex items-center">
                                                        <FiStar className="text-yellow-400 w-4 h-4 mr-1" />
                                                        <span className="text-sm">{course.instructor.rating}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FiUsers className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">{course.instructor.students.toLocaleString()} {isArabic ? 'طالب' : 'students'}</span>
                                                    </div>
                                                </div>
                                                <p className="text-secondary-700 dark:text-gray-300">
                                                    {course.instructor.bio[isArabic ? 'ar' : 'en']}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Reviews Tab */}
                                {activeTab === 'reviews' && (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">⭐</div>
                                        <h3 className="text-xl font-semibold mb-2 text-secondary-900 dark:text-white">
                                            {isArabic ? 'التقييمات قريباً' : 'Reviews Coming Soon'}
                                        </h3>
                                        <p className="text-secondary-600 dark:text-gray-400">
                                            {isArabic ? 'سيتم إضافة نظام التقييمات قريباً' : 'Review system will be added soon'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Course Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
                            <h3 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-white">
                                {isArabic ? 'معلومات الدورة' : 'Course Info'}
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-secondary-600 dark:text-gray-400">{isArabic ? 'المستوى' : 'Level'}:</span>
                                    <span className="font-medium text-secondary-900 dark:text-white">{course.level[isArabic ? 'ar' : 'en']}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary-600 dark:text-gray-400">{isArabic ? 'المدة' : 'Duration'}:</span>
                                    <span className="font-medium text-secondary-900 dark:text-white">{course.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary-600 dark:text-gray-400">{isArabic ? 'اللغة' : 'Language'}:</span>
                                    <span className="font-medium text-secondary-900 dark:text-white">{course.language[isArabic ? 'ar' : 'en']}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary-600 dark:text-gray-400">{isArabic ? 'آخر تحديث' : 'Last Updated'}:</span>
                                    <span className="font-medium text-secondary-900 dark:text-white">{new Date(course.lastUpdated).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail