import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
    FiUsers, FiBookOpen, FiVideo, FiTrendingUp, FiDollarSign,
    FiEye, FiAward, FiClock, FiBarChart2, FiPieChart, FiActivity,
    FiPlus, FiEdit, FiTrash2, FiMoreVertical, FiCalendar,
    FiDownload, FiFilter, FiSearch, FiRefreshCw
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import { useAuth } from '@contexts/AuthContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const AdminDashboard = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { user } = useAuth()

    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({})
    const [recentActivity, setRecentActivity] = useState([])
    const [topCourses, setTopCourses] = useState([])
    const [selectedPeriod, setSelectedPeriod] = useState('week')

    useEffect(() => {
        fetchDashboardData()
    }, [selectedPeriod])

    const fetchDashboardData = async () => {
        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock data
            setStats({
                totalStudents: 12547,
                totalCourses: 89,
                totalVideos: 1247,
                totalRevenue: 45230,
                activeStudents: 8934,
                completionRate: 78.5,
                avgRating: 4.7,
                totalCertificates: 3421
            })

            setRecentActivity([
                {
                    id: 1,
                    type: 'enrollment',
                    user: isArabic ? 'أحمد محمد' : 'Ahmed Mohammed',
                    course: isArabic ? 'مقدمة في البرمجة' : 'Introduction to Programming',
                    time: '5 minutes ago',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohammed&background=2563eb&color=fff&size=40'
                },
                {
                    id: 2,
                    type: 'completion',
                    user: isArabic ? 'فاطمة علي' : 'Fatima Ali',
                    course: isArabic ? 'تطوير المواقع' : 'Web Development',
                    time: '12 minutes ago',
                    avatar: 'https://ui-avatars.com/api/?name=Fatima+Ali&background=10b981&color=fff&size=40'
                },
                {
                    id: 3,
                    type: 'review',
                    user: isArabic ? 'محمد حسن' : 'Mohammed Hassan',
                    course: isArabic ? 'تصميم الواجهات' : 'UI/UX Design',
                    time: '1 hour ago',
                    rating: 5,
                    avatar: 'https://ui-avatars.com/api/?name=Mohammed+Hassan&background=8b5cf6&color=fff&size=40'
                },
                {
                    id: 4,
                    type: 'enrollment',
                    user: isArabic ? 'نور الدين' : 'Nour Aldin',
                    course: isArabic ? 'التسويق الرقمي' : 'Digital Marketing',
                    time: '2 hours ago',
                    avatar: 'https://ui-avatars.com/api/?name=Nour+Aldin&background=f59e0b&color=fff&size=40'
                }
            ])

            setTopCourses([
                {
                    id: 1,
                    title: isArabic ? 'مقدمة في البرمجة' : 'Introduction to Programming',
                    enrollments: 2547,
                    rating: 4.8,
                    revenue: 12450,
                    growth: 15.2
                },
                {
                    id: 2,
                    title: isArabic ? 'تطوير المواقع' : 'Web Development Bootcamp',
                    enrollments: 1834,
                    rating: 4.6,
                    revenue: 8920,
                    growth: 8.7
                },
                {
                    id: 3,
                    title: isArabic ? 'تصميم الواجهات' : 'UI/UX Design Masterclass',
                    enrollments: 1456,
                    rating: 4.9,
                    revenue: 7230,
                    growth: 22.1
                }
            ])
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        {
            title: isArabic ? 'إجمالي الطلاب' : 'Total Students',
            value: stats.totalStudents?.toLocaleString() || '0',
            icon: FiUsers,
            color: 'bg-blue-500',
            change: '+12.5%',
            changeType: 'positive'
        },
        {
            title: isArabic ? 'إجمالي الدورات' : 'Total Courses',
            value: stats.totalCourses || '0',
            icon: FiBookOpen,
            color: 'bg-green-500',
            change: '+3.2%',
            changeType: 'positive'
        },
        {
            title: isArabic ? 'إجمالي الفيديوهات' : 'Total Videos',
            value: stats.totalVideos?.toLocaleString() || '0',
            icon: FiVideo,
            color: 'bg-purple-500',
            change: '+8.1%',
            changeType: 'positive'
        },
        {
            title: isArabic ? 'الطلاب النشطون' : 'Active Students',
            value: stats.activeStudents?.toLocaleString() || '0',
            icon: FiActivity,
            color: 'bg-orange-500',
            change: '+5.7%',
            changeType: 'positive'
        },
        {
            title: isArabic ? 'معدل الإكمال' : 'Completion Rate',
            value: `${stats.completionRate || 0}%`,
            icon: FiTrendingUp,
            color: 'bg-indigo-500',
            change: '+2.3%',
            changeType: 'positive'
        },
        {
            title: isArabic ? 'متوسط التقييم' : 'Average Rating',
            value: stats.avgRating || '0',
            icon: FiAward,
            color: 'bg-yellow-500',
            change: '+0.2',
            changeType: 'positive'
        }
    ]

    const quickActions = [
        {
            title: isArabic ? 'إضافة دورة جديدة' : 'Add New Course',
            description: isArabic ? 'إنشاء دورة تدريبية جديدة' : 'Create a new training course',
            icon: FiPlus,
            color: 'bg-blue-500',
            link: '/admin/courses/new'
        },
        {
            title: isArabic ? 'إدارة الطلاب' : 'Manage Students',
            description: isArabic ? 'عرض وإدارة الطلاب المسجلين' : 'View and manage enrolled students',
            icon: FiUsers,
            color: 'bg-green-500',
            link: '/admin/students'
        },
        {
            title: isArabic ? 'إدارة الفيديوهات' : 'Manage Videos',
            description: isArabic ? 'رفع وتنظيم محتوى الفيديو' : 'Upload and organize video content',
            icon: FiVideo,
            color: 'bg-purple-500',
            link: '/admin/videos'
        },
        {
            title: isArabic ? 'التقارير والإحصائيات' : 'Reports & Analytics',
            description: isArabic ? 'عرض التقارير التفصيلية' : 'View detailed reports',
            icon: FiBarChart2,
            color: 'bg-orange-500',
            link: '/admin/reports'
        }
    ]

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isArabic ? 'لوحة التحكم الإدارية' : 'Admin Dashboard'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? `مرحباً ${user?.firstName || 'المدير'}` : `Welcome back, ${user?.firstName || 'Admin'}`}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="week">{isArabic ? 'هذا الأسبوع' : 'This Week'}</option>
                                <option value="month">{isArabic ? 'هذا الشهر' : 'This Month'}</option>
                                <option value="year">{isArabic ? 'هذا العام' : 'This Year'}</option>
                            </select>
                            <button
                                onClick={fetchDashboardData}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <FiRefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {statCards.map((stat, index) => {
                        const IconComponent = stat.icon
                        return (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <span className={`text-sm font-medium ${stat.changeType === 'positive'
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {stat.change}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 rtl:ml-0 rtl:mr-2">
                                                {isArabic ? 'من الأسبوع الماضي' : 'from last week'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
                            </h2>
                            <div className="space-y-3">
                                {quickActions.map((action, index) => {
                                    const IconComponent = action.icon
                                    return (
                                        <Link
                                            key={index}
                                            to={action.link}
                                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                        >
                                            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3`}>
                                                <IconComponent className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                                    {action.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
                                </h2>
                                <Link
                                    to="/admin/activity"
                                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                                >
                                    {isArabic ? 'عرض الكل' : 'View All'}
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                                        <img
                                            src={activity.avatar}
                                            alt={activity.user}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {activity.user}
                                                </span>
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {activity.type === 'enrollment' && (isArabic ? 'سجل في' : 'enrolled in')}
                                                    {activity.type === 'completion' && (isArabic ? 'أكمل' : 'completed')}
                                                    {activity.type === 'review' && (isArabic ? 'قيم' : 'reviewed')}
                                                </span>
                                                <span className="font-medium text-primary-600 dark:text-primary-400">
                                                    {activity.course}
                                                </span>
                                                {activity.rating && (
                                                    <div className="flex items-center">
                                                        <span className="text-yellow-400">★</span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                                                            {activity.rating}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Courses */}
                <div className="mt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {isArabic ? 'أفضل الدورات أداءً' : 'Top Performing Courses'}
                            </h2>
                            <Link
                                to="/admin/courses"
                                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                            >
                                {isArabic ? 'إدارة الدورات' : 'Manage Courses'}
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left rtl:text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                                            {isArabic ? 'الدورة' : 'Course'}
                                        </th>
                                        <th className="text-left rtl:text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                                            {isArabic ? 'التسجيلات' : 'Enrollments'}
                                        </th>
                                        <th className="text-left rtl:text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                                            {isArabic ? 'التقييم' : 'Rating'}
                                        </th>
                                        <th className="text-left rtl:text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                                            {isArabic ? 'النمو' : 'Growth'}
                                        </th>
                                        <th className="text-right rtl:text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                                            {isArabic ? 'إجراءات' : 'Actions'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topCourses.map((course) => (
                                        <tr key={course.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="py-4 px-4">
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {course.title}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                                                {course.enrollments.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 mr-1">★</span>
                                                    <span className="text-gray-900 dark:text-white">{course.rating}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-green-600 dark:text-green-400 font-medium">
                                                    +{course.growth}%
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right rtl:text-left">
                                                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                    <FiMoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard