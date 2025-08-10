import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
    FiSearch,
    FiClock,
    FiUsers,
    FiStar,
    FiPlay,
    FiCode,
    FiTrendingUp,
    FiGlobe,
    FiDatabase,
    FiCamera,
    FiHeart,
    FiTarget,
    FiEdit3
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import { useAuth } from '@contexts/AuthContext'
import api from '@services/api'
import LoadingSpinner from '@components/common/LoadingSpinner'
import PageTransition from '@components/common/PageTransition'
import { FadeInSection } from '@components/common/ScrollAnimation'
import AnimatedCard from '@components/common/AnimatedCard'

const categoryThemes = {
    'Programming': {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: FiCode,
        accent: 'bg-blue-100'
    },
    'Web Development': {
        gradient: 'from-green-500 to-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: FiGlobe,
        accent: 'bg-green-100'
    },
    'Design': {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        icon: FiEdit3,
        accent: 'bg-purple-100'
    },
    'Marketing': {
        gradient: 'from-orange-500 to-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        icon: FiTrendingUp,
        accent: 'bg-orange-100'
    },
    'Data Science': {
        gradient: 'from-indigo-500 to-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-700',
        icon: FiDatabase,
        accent: 'bg-indigo-100'
    },
    'Languages': {
        gradient: 'from-pink-500 to-pink-600',
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        text: 'text-pink-700',
        icon: FiGlobe,
        accent: 'bg-pink-100'
    },
    'Photography': {
        gradient: 'from-yellow-500 to-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        icon: FiCamera,
        accent: 'bg-yellow-100'
    },
    'Business': {
        gradient: 'from-gray-500 to-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        icon: FiTarget,
        accent: 'bg-gray-100'
    }
}

const levelThemes = {
    'beginner': {
        color: 'text-green-700 dark:text-green-300',
        bg: 'bg-green-100 dark:bg-green-900',
        border: 'border-green-200 dark:border-green-700'
    },
    'intermediate': {
        color: 'text-orange-700 dark:text-orange-300',
        bg: 'bg-orange-100 dark:bg-orange-900',
        border: 'border-orange-200 dark:border-orange-700'
    },
    'advanced': {
        color: 'text-red-700 dark:text-red-300',
        bg: 'bg-red-100 dark:bg-red-900',
        border: 'border-red-200 dark:border-red-700'
    },
    'all_levels': {
        color: 'text-blue-700 dark:text-blue-300',
        bg: 'bg-blue-100 dark:bg-blue-900',
        border: 'border-blue-200 dark:border-blue-700'
    }
}

const CourseCard = ({ course, isArabic, isEnrolled, delay = 0 }) => {
    const categoryName = course.category?.name || 'Programming'
    const theme = categoryThemes[categoryName] || categoryThemes['Programming']
    const IconComponent = theme.icon

    const levelTheme = levelThemes[course.level] || levelThemes['beginner']
    const levelText = {
        'beginner': { en: 'Beginner', ar: 'مبتدئ' },
        'intermediate': { en: 'Intermediate', ar: 'متوسط' },
        'advanced': { en: 'Advanced', ar: 'متقدم' },
        'all_levels': { en: 'All Levels', ar: 'جميع المستويات' }
    }

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        if (hours > 0) {
            return isArabic ? `${hours} ساعة ${mins} دقيقة` : `${hours}h ${mins}m`
        }
        return isArabic ? `${mins} دقيقة` : `${mins}m`
    }

    return (
        <AnimatedCard
            delay={delay}
            className={`group border ${theme.border} dark:border-gray-700 hover:shadow-xl transition-all duration-300 interactive-card`}
        >
            <div className={`h-2 bg-gradient-to-r ${theme.gradient}`}></div>

            <div className="relative overflow-hidden">
                <img
                    src={course.thumbnail || `https://picsum.photos/400/240?random=${course._id}`}
                    alt={course.title || course.titleArabic}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${theme.gradient}`}>
                            <FiPlay className="text-white text-xl" />
                        </div>
                    </div>
                </div>

                {course.isFeatured && (
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                        <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <FiStar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {isArabic ? 'مميز' : 'Featured'}
                        </div>
                    </div>
                )}

                {isEnrolled && (
                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                        <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <FiHeart className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {isArabic ? 'مسجل' : 'Enrolled'}
                        </div>
                    </div>
                )}

                <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3">
                    <div className={`p-2 rounded-lg ${theme.accent} backdrop-blur-sm`}>
                        <IconComponent className={`w-4 h-4 ${theme.text}`} />
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${theme.bg} ${theme.text}`}>
                        {course.category?.name || 'Programming'}
                    </span>
                    <div className="flex items-center">
                        <FiStar className="text-yellow-400 w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span className="text-sm font-medium text-secondary-700">
                            {course.ratings?.average?.toFixed(1) || '4.5'}
                        </span>
                        <span className="text-xs text-secondary-500 ml-1 rtl:ml-0 rtl:mr-1">
                            ({course.ratings?.count || 0})
                        </span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {isArabic ? course.titleArabic || course.title : course.title || course.titleArabic}
                </h3>

                <p className="text-secondary-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {isArabic ? course.descriptionArabic || course.description : course.description || course.descriptionArabic}
                </p>

                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mr-2 rtl:mr-0 rtl:ml-2">
                        <span className="text-white text-xs font-medium">
                            {course.instructor?.firstName?.charAt(0) || 'A'}
                        </span>
                    </div>
                    <span className="text-sm text-secondary-600 dark:text-gray-300">
                        {course.instructor?.firstName} {course.instructor?.lastName}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm text-secondary-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span>{formatDuration(course.duration || 480)}</span>
                    </div>
                    <div className="flex items-center">
                        <FiUsers className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span>{course.totalEnrollments?.toLocaleString() || '0'}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${levelTheme.bg} ${levelTheme.color}`}>
                        {levelText[course.level]?.[isArabic ? 'ar' : 'en'] || 'Beginner'}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-secondary-100 dark:border-gray-700">
                    <div className="flex flex-col">
                        <span className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                            {course.pricing?.type === 'free' ? (isArabic ? 'مجاني' : 'Free') : `$${course.pricing?.price || 0}`}
                        </span>
                        {course.pricing?.discount?.percentage > 0 && (
                            <span className="text-xs text-red-500 line-through">
                                ${course.pricing.price}
                            </span>
                        )}
                    </div>

                    <Link
                        to={`/courses/${course.slug || course._id}`}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gradient-to-r ${theme.gradient} text-white hover:shadow-lg hover:scale-105`}
                    >
                        {isEnrolled
                            ? (isArabic ? 'متابعة' : 'Continue')
                            : (isArabic ? 'ابدأ الآن' : 'Start Now')
                        }
                    </Link>
                </div>
            </div>
        </AnimatedCard>
    )
}

const Courses = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { user, isEnrolledInCourse } = useAuth()

    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedLevel, setSelectedLevel] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const placeholderCourses = [
        {
            _id: '1',
            title: 'Introduction to Programming',
            titleArabic: 'مقدمة في البرمجة',
            description: 'Learn the fundamentals of programming with hands-on examples and projects',
            descriptionArabic: 'تعلم أساسيات البرمجة مع أمثلة عملية ومشاريع تطبيقية',
            slug: 'intro-programming',
            category: { name: 'Programming' },
            level: 'beginner',
            duration: 480,
            totalEnrollments: 1250,
            ratings: { average: 4.8, count: 156 },
            pricing: { type: 'free' },
            isFeatured: true,
            instructor: { firstName: 'Ahmad', lastName: 'Hassan' },
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop'
        },
        {
            _id: '2',
            title: 'Web Development Bootcamp',
            titleArabic: 'معسكر تطوير المواقع',
            description: 'Build modern websites with HTML, CSS, JavaScript, and React',
            descriptionArabic: 'ابني مواقع حديثة باستخدام HTML و CSS و JavaScript و React',
            slug: 'web-dev-bootcamp',
            category: { name: 'Web Development' },
            level: 'intermediate',
            duration: 720,
            totalEnrollments: 890,
            ratings: { average: 4.6, count: 89 },
            pricing: { type: 'free' },
            isFeatured: false,
            instructor: { firstName: 'Fatima', lastName: 'Al-Zahra' },
            thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=240&fit=crop'
        },
        {
            _id: '3',
            title: 'UI/UX Design Masterclass',
            titleArabic: 'دورة تصميم واجهات المستخدم',
            description: 'Master user interface and user experience design principles',
            descriptionArabic: 'اتقن مبادئ تصميم واجهات وتجربة المستخدم',
            slug: 'ui-ux-design',
            category: { name: 'Design' },
            level: 'intermediate',
            duration: 600,
            totalEnrollments: 756,
            ratings: { average: 4.7, count: 92 },
            pricing: { type: 'free' },
            isFeatured: true,
            instructor: { firstName: 'Layla', lastName: 'Mansour' },
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop'
        },
        {
            _id: '4',
            title: 'Digital Marketing Strategy',
            titleArabic: 'استراتيجية التسويق الرقمي',
            description: 'Learn effective digital marketing techniques and social media strategies',
            descriptionArabic: 'تعلم تقنيات التسويق الرقمي الفعالة واستراتيجيات وسائل التواصل',
            slug: 'digital-marketing',
            category: { name: 'Marketing' },
            level: 'beginner',
            duration: 360,
            totalEnrollments: 2100,
            ratings: { average: 4.9, count: 234 },
            pricing: { type: 'free' },
            isFeatured: true,
            instructor: { firstName: 'Omar', lastName: 'Khalil' },
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop'
        },
        {
            _id: '5',
            title: 'Data Science with Python',
            titleArabic: 'علم البيانات باستخدام بايثون',
            description: 'Analyze data and build machine learning models with Python',
            descriptionArabic: 'حلل البيانات وابني نماذج التعلم الآلي باستخدام بايثون',
            slug: 'data-science-python',
            category: { name: 'Data Science' },
            level: 'advanced',
            duration: 900,
            totalEnrollments: 567,
            ratings: { average: 4.5, count: 78 },
            pricing: { type: 'free' },
            isFeatured: false,
            instructor: { firstName: 'Mahmoud', lastName: 'Ali' },
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop'
        },
        {
            _id: '6',
            title: 'Business English Communication',
            titleArabic: 'التواصل باللغة الإنجليزية للأعمال',
            description: 'Improve your professional English communication skills',
            descriptionArabic: 'حسن مهارات التواصل المهني باللغة الإنجليزية',
            slug: 'business-english',
            category: { name: 'Languages' },
            level: 'intermediate',
            duration: 540,
            totalEnrollments: 1890,
            ratings: { average: 4.4, count: 167 },
            pricing: { type: 'free' },
            isFeatured: false,
            instructor: { firstName: 'Sarah', lastName: 'Johnson' },
            thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=240&fit=crop'
        }
    ]

    useEffect(() => {
        fetchCourses()
        fetchCategories()
    }, [currentPage, selectedCategory, selectedLevel, searchTerm])

    const fetchCourses = async () => {
        try {
            setLoading(true)

            // Build query parameters
            const params = new URLSearchParams({
                page: currentPage,
                limit: 12,
                ...(selectedCategory && { category: selectedCategory }),
                ...(selectedLevel && { level: selectedLevel }),
                ...(searchTerm && { search: searchTerm })
            })

            // Try to fetch from API first
            const response = await api.get(`/courses?${params}`)

            if (response.data.success && response.data.courses.length > 0) {
                setCourses(response.data.courses)
                setTotalPages(response.data.pagination.pages)
            } else {
                // Fallback to placeholder courses if no real data
                setPlaceholderCourses()
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error)
            // Fallback to placeholder courses on error
            setPlaceholderCourses()
        } finally {
            setLoading(false)
        }
    }

    const setPlaceholderCourses = () => {
        // Apply filters to placeholder courses
        let filtered = placeholderCourses

        if (selectedCategory && selectedCategory !== '') {
            filtered = filtered.filter(course =>
                course.category.name.toLowerCase().includes(selectedCategory.toLowerCase())
            )
        }

        if (selectedLevel && selectedLevel !== '') {
            filtered = filtered.filter(course => course.level === selectedLevel)
        }

        if (searchTerm) {
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.titleArabic.includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.descriptionArabic.includes(searchTerm)
            )
        }

        setCourses(filtered)
        setTotalPages(1)
    }

    const fetchCategories = async () => {
        try {
            setCategories([
                { _id: '', name: isArabic ? 'الكل' : 'All Categories' },
                { _id: 'programming', name: isArabic ? 'البرمجة' : 'Programming' },
                { _id: 'web-dev', name: isArabic ? 'تطوير المواقع' : 'Web Development' },
                { _id: 'design', name: isArabic ? 'التصميم' : 'Design' },
                { _id: 'marketing', name: isArabic ? 'التسويق' : 'Marketing' },
                { _id: 'data-science', name: isArabic ? 'علم البيانات' : 'Data Science' },
                { _id: 'languages', name: isArabic ? 'اللغات' : 'Languages' }
            ])
        } catch (error) {
            console.error('Failed to fetch categories:', error)
        }
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId)
        setCurrentPage(1)
    }

    const handleLevelChange = (level) => {
        setSelectedLevel(level)
        setCurrentPage(1)
    }

    if (loading && currentPage === 1) {
        return (
            <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        )
    }

    return (
        <PageTransition className="min-h-screen bg-secondary-50 dark:bg-gray-900">
            <div className="bg-gradient-primary text-white py-20">
                <div className="container">
                    <FadeInSection className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {isArabic ? 'اكتشف دوراتنا' : 'Discover Our Courses'}
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
                            {isArabic
                                ? 'تعلم مهارات جديدة وطور مسيرتك المهنية مع دورات عالية الجودة'
                                : 'Learn new skills and advance your career with high-quality courses'
                            }
                        </p>
                        <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
                            <div className="text-center">
                                <div className="text-3xl font-bold">{courses.length}+</div>
                                <div className="text-sm opacity-80">{isArabic ? 'دورة' : 'Courses'}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">50K+</div>
                                <div className="text-sm opacity-80">{isArabic ? 'طالب' : 'Students'}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">4.8</div>
                                <div className="text-sm opacity-80">{isArabic ? 'تقييم' : 'Rating'}</div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>

            <div className="container py-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 border border-secondary-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <FiSearch className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                                <input
                                    type="text"
                                    placeholder={isArabic ? 'ابحث عن الدورات...' : 'Search courses...'}
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-secondary-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full px-4 py-3 border border-secondary-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                            >
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={selectedLevel}
                                onChange={(e) => handleLevelChange(e.target.value)}
                                className="w-full px-4 py-3 border border-secondary-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                            >
                                <option value="">{isArabic ? 'جميع المستويات' : 'All Levels'}</option>
                                <option value="beginner">{isArabic ? 'مبتدئ' : 'Beginner'}</option>
                                <option value="intermediate">{isArabic ? 'متوسط' : 'Intermediate'}</option>
                                <option value="advanced">{isArabic ? 'متقدم' : 'Advanced'}</option>
                                <option value="all_levels">{isArabic ? 'جميع المستويات' : 'All Levels'}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-secondary-600 dark:text-gray-400">
                        {isArabic
                            ? `عرض ${courses.length} دورة`
                            : `Showing ${courses.length} courses`
                        }
                    </p>
                </div>

                {courses.length > 0 ? (
                    <FadeInSection>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course, index) => (
                                <CourseCard
                                    key={course._id}
                                    course={course}
                                    isArabic={isArabic}
                                    isEnrolled={isEnrolledInCourse(course._id)}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>
                    </FadeInSection>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-6">📚</div>
                        <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">
                            {isArabic ? 'لا توجد دورات' : 'No courses found'}
                        </h3>
                        <p className="text-secondary-600 dark:text-gray-400 mb-8">
                            {isArabic
                                ? 'جرب تغيير معايير البحث أو الفلترة'
                                : 'Try adjusting your search or filter criteria'
                            }
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setSelectedCategory('')
                                setSelectedLevel('')
                                setCurrentPage(1)
                            }}
                            className="btn btn-primary"
                        >
                            {isArabic ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
                        </button>
                    </div>
                )}
            </div>
        </PageTransition>
    )
}

export default Courses