import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
    FiBook, FiClock, FiTrendingUp, FiAward,
    FiCalendar, FiTarget, FiUsers, FiStar, FiChevronRight, FiActivity
} from 'react-icons/fi'
import { useAuth } from '@contexts/AuthContext'
import { useLanguage } from '@contexts/LanguageContext'
import api from '@services/api'
import LoadingSpinner from '@components/common/LoadingSpinner'

const Dashboard = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { user } = useAuth()

    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // Simulate API call with mock data
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock dashboard data
            const mockDashboardData = {
                stats: {
                    enrolledCourses: 3,
                    completedCourses: 1,
                    totalWatchTime: 1250, // minutes
                    certificatesEarned: 1,
                    currentStreak: 7,
                    totalProgress: 67
                },
                recentCourses: [
                    {
                        id: 'intro-programming',
                        title: isArabic ? 'مقدمة في البرمجة' : 'Introduction to Programming',
                        progress: 75,
                        thumbnail: 'https://picsum.photos/300/200?random=1',
                        instructor: isArabic ? 'أحمد حسن' : 'Ahmad Hassan',
                        lastAccessed: '2024-01-25',
                        nextLesson: isArabic ? 'الدوال والطرق' : 'Functions and Methods'
                    },
                    {
                        id: 'web-dev-bootcamp',
                        title: isArabic ? 'معسكر تطوير المواقع' : 'Web Development Bootcamp',
                        progress: 45,
                        thumbnail: 'https://picsum.photos/300/200?random=2',
                        instructor: isArabic ? 'فاطمة الزهراء' : 'Fatima Al-Zahra',
                        lastAccessed: '2024-01-23',
                        nextLesson: isArabic ? 'CSS المتقدم' : 'Advanced CSS'
                    }
                ],
                upcomingDeadlines: [
                    {
                        id: 1,
                        title: isArabic ? 'مشروع الآلة الحاسبة' : 'Calculator Project',
                        course: isArabic ? 'مقدمة في البرمجة' : 'Introduction to Programming',
                        dueDate: '2024-01-30',
                        type: 'assignment'
                    }
                ],
                achievements: [
                    {
                        id: 1,
                        title: isArabic ? 'أول دورة مكتملة' : 'First Course Completed',
                        description: isArabic ? 'أكملت دورتك الأولى بنجاح' : 'Successfully completed your first course',
                        icon: 'trophy',
                        earnedDate: '2024-01-20'
                    }
                ]
            }

            setDashboardData(mockDashboardData)
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
            setError('Failed to load dashboard data')
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        if (hours > 0) {
            return `${hours}h ${mins}m`
        }
        return `${mins}m`
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) {
            return isArabic ? 'صباح الخير' : 'Good Morning'
        } else if (hour < 18) {
            return isArabic ? 'مساء الخير' : 'Good Afternoon'
        } else {
            return isArabic ? 'مساء الخير' : 'Good Evening'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-gray-900 flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="btn btn-primary"
                    >
                        {isArabic ? 'إعادة المحاولة' : 'Try Again'}
                    </button>
                </div>
            </div>
        )
    }

    const stats = dashboardData?.stats || {}
    const recentCourses = dashboardData?.recentCourses || []
    const enrolledCourses = dashboardData?.enrolledCourses || []

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-gray-900">
            <div className="container py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                        {getGreeting()}, {user?.firstName}! 👋
                    </h1>
                    <p className="text-secondary-600 dark:text-gray-400">
                        {isArabic
                            ? 'مرحباً بك في لوحة التحكم الخاصة بك. تابع رحلة التعلم!'
                            : 'Welcome to your learning dashboard. Continue your learning journey!'
                        }
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-secondary-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <FiBook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
                                {stats.totalCourses || 0}
                            </span>
                        </div>
                        <h3 className="font-medium text-secondary-700 dark:text-gray-300">
                            {isArabic ? 'إجمالي الدورات' : 'Total Courses'}
                        </h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400 mt-1">
                            {isArabic ? 'الدورات المسجل بها' : 'Enrolled courses'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-secondary-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <FiAward className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
                                {stats.completedCourses || 0}
                            </span>
                        </div>
                        <h3 className="font-medium text-secondary-700 dark:text-gray-300">
                            {isArabic ? 'الدورات المكتملة' : 'Completed'}
                        </h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400 mt-1">
                            {isArabic ? 'دورات مكتملة بنجاح' : 'Successfully completed'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-secondary-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                <FiTrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
                                {stats.inProgressCourses || 0}
                            </span>
                        </div>
                        <h3 className="font-medium text-secondary-700 dark:text-gray-300">
                            {isArabic ? 'قيد التقدم' : 'In Progress'}
                        </h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400 mt-1">
                            {isArabic ? 'دورات قيد الدراسة' : 'Currently studying'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-secondary-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
                                {formatTime(stats.totalWatchTime || 0)}
                            </span>
                        </div>
                        <h3 className="font-medium text-secondary-700 dark:text-gray-300">
                            {isArabic ? 'وقت المشاهدة' : 'Watch Time'}
                        </h3>
                        <p className="text-sm text-secondary-500 dark:text-gray-400 mt-1">
                            {isArabic ? 'إجمالي وقت التعلم' : 'Total learning time'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-100 dark:border-gray-700">
                            <div className="p-6 border-b border-secondary-100 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white flex items-center">
                                        <FiActivity className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                                        {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
                                    </h2>
                                    <Link
                                        to="/courses"
                                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                                    >
                                        {isArabic ? 'عرض الكل' : 'View All'}
                                        <FiChevronRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                {recentCourses.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentCourses.map((course) => (
                                            <div key={course.id} className="flex items-center p-4 bg-secondary-50 dark:bg-gray-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-gray-600 transition-colors">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-16 h-16 rounded-lg object-cover mr-4 rtl:mr-0 rtl:ml-4"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-secondary-900 dark:text-white mb-1">
                                                        {course.title}
                                                    </h3>
                                                    <div className="flex items-center text-sm text-secondary-600 dark:text-gray-300 mb-2">
                                                        <FiClock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                                                        {isArabic ? 'آخر وصول:' : 'Last accessed:'} {course.lastAccessed}
                                                    </div>
                                                    <div className="w-full bg-secondary-200 dark:bg-gray-600 rounded-full h-2">
                                                        <div
                                                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-xs text-secondary-500 dark:text-gray-400">
                                                            {course.progress}% {isArabic ? 'مكتمل' : 'complete'}
                                                        </span>
                                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                            <span className="text-xs text-secondary-500 dark:text-gray-400">
                                                                {isArabic ? 'التالي:' : 'Next:'} {course.nextLesson}
                                                            </span>
                                                            <Link
                                                                to={`/courses/${course.id}`}
                                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                                            >
                                                                {isArabic ? 'متابعة' : 'Continue'}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FiBook className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-secondary-900 mb-2">
                                            {isArabic ? 'لا توجد دورات بعد' : 'No courses yet'}
                                        </h3>
                                        <p className="text-secondary-600 mb-4">
                                            {isArabic
                                                ? 'ابدأ رحلة التعلم بالتسجيل في دورة'
                                                : 'Start your learning journey by enrolling in a course'
                                            }
                                        </p>
                                        <Link to="/courses" className="btn btn-primary">
                                            {isArabic ? 'تصفح الدورات' : 'Browse Courses'}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & Learning Streak */}
                    <div className="space-y-6">
                        {/* Learning Streak */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-100 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                                <FiTarget className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                                {isArabic ? 'سلسلة التعلم' : 'Learning Streak'}
                            </h3>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-2">
                                    {stats.loginStreak || 0}
                                </div>
                                <p className="text-secondary-600 dark:text-gray-400 text-sm">
                                    {isArabic ? 'أيام متتالية' : 'days in a row'}
                                </p>
                                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                                    <p className="text-sm text-primary-700">
                                        {isArabic
                                            ? 'استمر في التعلم يومياً للحفاظ على السلسلة!'
                                            : 'Keep learning daily to maintain your streak!'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-100 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                                {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    to="/courses"
                                    className="flex items-center p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <FiBook className="w-5 h-5 text-primary-600 mr-3 rtl:mr-0 rtl:ml-3" />
                                    <span className="font-medium text-secondary-900 dark:text-white">
                                        {isArabic ? 'تصفح الدورات' : 'Browse Courses'}
                                    </span>
                                </Link>

                                <Link
                                    to="/profile"
                                    className="flex items-center p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <FiUsers className="w-5 h-5 text-primary-600 mr-3 rtl:mr-0 rtl:ml-3" />
                                    <span className="font-medium text-secondary-900 dark:text-white">
                                        {isArabic ? 'الملف الشخصي' : 'My Profile'}
                                    </span>
                                </Link>

                                <Link
                                    to="/certificates"
                                    className="flex items-center p-3 bg-secondary-50 dark:bg-gray-700 rounded-lg hover:bg-secondary-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <FiAward className="w-5 h-5 text-primary-600 mr-3 rtl:mr-0 rtl:ml-3" />
                                    <span className="font-medium text-secondary-900 dark:text-white">
                                        {isArabic ? 'الشهادات' : 'Certificates'}
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Achievement Badge */}
                        {stats.completedCourses > 0 && (
                            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-sm p-6 text-white">
                                <div className="text-center">
                                    <FiStar className="w-8 h-8 mx-auto mb-3" />
                                    <h3 className="font-semibold mb-2">
                                        {isArabic ? 'مبروك!' : 'Congratulations!'}
                                    </h3>
                                    <p className="text-sm opacity-90">
                                        {isArabic
                                            ? `لقد أكملت ${stats.completedCourses} دورة`
                                            : `You've completed ${stats.completedCourses} course${stats.completedCourses > 1 ? 's' : ''}`
                                        }
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard