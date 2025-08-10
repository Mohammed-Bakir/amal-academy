import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
    FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiCamera,
    FiEdit3, FiSave, FiX, FiEye, FiEyeOff, FiLock, FiSettings,
    FiBookOpen, FiAward, FiTrendingUp, FiDownload, FiShare2,
    FiBell, FiGlobe, FiMoon, FiSun, FiTrash2, FiCheck
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import { useAuth } from '@contexts/AuthContext'
import { useTheme } from '@contexts/ThemeContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const Profile = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { user, updateProfile } = useAuth()
    const { theme, toggleTheme } = useTheme()

    const [activeTab, setActiveTab] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        dateOfBirth: '',
        avatar: ''
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        courseUpdates: true,
        marketingEmails: false,
        pushNotifications: true
    })

    // Mock enrolled courses data
    const enrolledCourses = [
        {
            id: 'intro-programming',
            title: isArabic ? 'مقدمة في البرمجة' : 'Introduction to Programming',
            progress: 75,
            thumbnail: 'https://picsum.photos/300/200?random=1',
            instructor: isArabic ? 'أحمد حسن' : 'Ahmad Hassan',
            completedLessons: 15,
            totalLessons: 20,
            lastAccessed: '2024-01-25'
        },
        {
            id: 'web-dev-bootcamp',
            title: isArabic ? 'معسكر تطوير المواقع' : 'Web Development Bootcamp',
            progress: 45,
            thumbnail: 'https://picsum.photos/300/200?random=2',
            instructor: isArabic ? 'فاطمة الزهراء' : 'Fatima Al-Zahra',
            completedLessons: 8,
            totalLessons: 18,
            lastAccessed: '2024-01-23'
        },
        {
            id: 'ui-ux-design',
            title: isArabic ? 'دورة تصميم واجهات المستخدم' : 'UI/UX Design Masterclass',
            progress: 100,
            thumbnail: 'https://picsum.photos/300/200?random=3',
            instructor: isArabic ? 'ليلى منصور' : 'Layla Mansour',
            completedLessons: 12,
            totalLessons: 12,
            lastAccessed: '2024-01-20',
            completed: true
        }
    ]

    // Mock certificates data
    const certificates = [
        {
            id: 'cert-1',
            courseTitle: isArabic ? 'دورة تصميم واجهات المستخدم' : 'UI/UX Design Masterclass',
            issueDate: '2024-01-20',
            certificateId: 'AMAL-CERT-001',
            instructor: isArabic ? 'ليلى منصور' : 'Layla Mansour'
        }
    ]

    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                location: user.location || '',
                bio: user.bio || '',
                dateOfBirth: user.dateOfBirth || '',
                avatar: user.avatar || ''
            })
        }
    }, [user])

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            await updateProfile(profileData)
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to update profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert(isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match')
            return
        }

        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            alert(isArabic ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully')
        } catch (error) {
            console.error('Failed to change password:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfileData(prev => ({ ...prev, avatar: e.target.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const tabs = [
        { id: 'profile', label: isArabic ? 'الملف الشخصي' : 'Profile', icon: FiUser },
        { id: 'courses', label: isArabic ? 'دوراتي' : 'My Courses', icon: FiBookOpen },
        { id: 'certificates', label: isArabic ? 'الشهادات' : 'Certificates', icon: FiAward },
        { id: 'settings', label: isArabic ? 'الإعدادات' : 'Settings', icon: FiSettings }
    ]

    if (!user) {
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
                                {isArabic ? 'ملفي الشخصي' : 'My Profile'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? 'إدارة معلوماتك الشخصية وإعداداتك' : 'Manage your personal information and settings'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            {/* User Avatar */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <img
                                        src={profileData.avatar || `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=2563eb&color=fff&size=120`}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900"
                                    />
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                                            <FiCamera className="w-4 h-4" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-3">
                                    {profileData.firstName} {profileData.lastName}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {profileData.email}
                                </p>
                            </div>

                            {/* Navigation Tabs */}
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const IconComponent = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <IconComponent className="w-4 h-4 mr-3 rtl:mr-0 rtl:ml-3" />
                                            {tab.label}
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                                        </h2>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
                                        >
                                            {isEditing ? (
                                                <>
                                                    <FiX className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    {isArabic ? 'إلغاء' : 'Cancel'}
                                                </>
                                            ) : (
                                                <>
                                                    <FiEdit3 className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    {isArabic ? 'تعديل' : 'Edit'}
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isArabic ? 'الاسم الأول' : 'First Name'}
                                                </label>
                                                <div className="relative">
                                                    <FiUser className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="text"
                                                        value={profileData.firstName}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isArabic ? 'الاسم الأخير' : 'Last Name'}
                                                </label>
                                                <div className="relative">
                                                    <FiUser className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="text"
                                                        value={profileData.lastName}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                                                </label>
                                                <div className="relative">
                                                    <FiMail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="email"
                                                        value={profileData.email}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                                                </label>
                                                <div className="relative">
                                                    <FiPhone className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="tel"
                                                        value={profileData.phone}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isArabic ? 'الموقع' : 'Location'}
                                                </label>
                                                <div className="relative">
                                                    <FiMapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="text"
                                                        value={profileData.location}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    {isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
                                                </label>
                                                <div className="relative">
                                                    <FiCalendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <input
                                                        type="date"
                                                        value={profileData.dateOfBirth}
                                                        onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                {isArabic ? 'نبذة شخصية' : 'Bio'}
                                            </label>
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                                                disabled={!isEditing}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                                                placeholder={isArabic ? 'اكتب نبذة عن نفسك...' : 'Tell us about yourself...'}
                                            />
                                        </div>

                                        {isEditing && (
                                            <div className="flex justify-end mt-6">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {loading ? (
                                                        <LoadingSpinner size="small" className="mr-2 rtl:mr-0 rtl:ml-2" />
                                                    ) : (
                                                        <FiSave className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    )}
                                                    {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            )}

                            {/* My Courses Tab */}
                            {activeTab === 'courses' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {isArabic ? 'دوراتي' : 'My Courses'}
                                        </h2>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {enrolledCourses.length} {isArabic ? 'دورة' : 'courses'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {enrolledCourses.map((course) => (
                                            <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                        {isArabic ? 'المدرب:' : 'Instructor:'} {course.instructor}
                                                    </p>

                                                    <div className="mb-3">
                                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                            <span>{isArabic ? 'التقدم' : 'Progress'}</span>
                                                            <span>{course.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                            <div
                                                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${course.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                        <span>
                                                            {course.completedLessons}/{course.totalLessons} {isArabic ? 'دروس' : 'lessons'}
                                                        </span>
                                                        <span>
                                                            {isArabic ? 'آخر وصول:' : 'Last accessed:'} {course.lastAccessed}
                                                        </span>
                                                    </div>

                                                    <div className="flex space-x-2 rtl:space-x-reverse">
                                                        <Link
                                                            to={`/courses/${course.id}`}
                                                            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                                                        >
                                                            {course.completed
                                                                ? (isArabic ? 'مراجعة' : 'Review')
                                                                : (isArabic ? 'متابعة' : 'Continue')
                                                            }
                                                        </Link>
                                                        {course.completed && (
                                                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                                <FiAward className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Certificates Tab */}
                            {activeTab === 'certificates' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {isArabic ? 'شهاداتي' : 'My Certificates'}
                                        </h2>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {certificates.length} {isArabic ? 'شهادة' : 'certificates'}
                                        </div>
                                    </div>

                                    {certificates.length > 0 ? (
                                        <div className="space-y-4">
                                            {certificates.map((cert) => (
                                                <div key={cert.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                                                <FiAward className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                                    {cert.courseTitle}
                                                                </h3>
                                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                    {isArabic ? 'المدرب:' : 'Instructor:'} {cert.instructor}
                                                                </p>
                                                                <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                                                                    <span>{isArabic ? 'تاريخ الإصدار:' : 'Issued:'} {cert.issueDate}</span>
                                                                    <span>{isArabic ? 'رقم الشهادة:' : 'Certificate ID:'} {cert.certificateId}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2 rtl:space-x-reverse">
                                                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                <FiDownload className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                <FiShare2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <FiAward className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                                {isArabic ? 'لا توجد شهادات بعد' : 'No certificates yet'}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                                {isArabic ? 'أكمل دوراتك للحصول على الشهادات' : 'Complete courses to earn certificates'}
                                            </p>
                                            <Link
                                                to="/courses"
                                                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                            >
                                                <FiBookOpen className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                {isArabic ? 'تصفح الدورات' : 'Browse Courses'}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                        {isArabic ? 'الإعدادات' : 'Settings'}
                                    </h2>

                                    <div className="space-y-8">
                                        {/* Password Change */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                                {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
                                            </h3>
                                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        {isArabic ? 'كلمة المرور الحالية' : 'Current Password'}
                                                    </label>
                                                    <div className="relative">
                                                        <FiLock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={passwordData.currentPassword}
                                                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                                            className="w-full pl-10 rtl:pl-12 rtl:pr-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                        >
                                                            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            {isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={passwordData.confirmPassword}
                                                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {loading ? (
                                                        <LoadingSpinner size="small" className="mr-2 rtl:mr-0 rtl:ml-2" />
                                                    ) : (
                                                        <FiLock className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    )}
                                                    {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
                                                </button>
                                            </form>
                                        </div>

                                        {/* Notification Settings */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                                {isArabic ? 'إعدادات الإشعارات' : 'Notification Settings'}
                                            </h3>
                                            <div className="space-y-4">
                                                {[
                                                    { key: 'emailNotifications', label: isArabic ? 'إشعارات البريد الإلكتروني' : 'Email Notifications', icon: FiMail },
                                                    { key: 'courseUpdates', label: isArabic ? 'تحديثات الدورات' : 'Course Updates', icon: FiBookOpen },
                                                    { key: 'marketingEmails', label: isArabic ? 'رسائل التسويق' : 'Marketing Emails', icon: FiTrendingUp },
                                                    { key: 'pushNotifications', label: isArabic ? 'الإشعارات الفورية' : 'Push Notifications', icon: FiBell }
                                                ].map((setting) => {
                                                    const IconComponent = setting.icon
                                                    return (
                                                        <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                                            <div className="flex items-center">
                                                                <IconComponent className="w-5 h-5 text-gray-400 mr-3 rtl:mr-0 rtl:ml-3" />
                                                                <span className="text-gray-900 dark:text-white">{setting.label}</span>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={notifications[setting.key]}
                                                                    onChange={(e) => setNotifications(prev => ({ ...prev, [setting.key]: e.target.checked }))}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {/* Theme Settings */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                                {isArabic ? 'إعدادات المظهر' : 'Appearance Settings'}
                                            </h3>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                                <div className="flex items-center">
                                                    {theme === 'dark' ? (
                                                        <FiMoon className="w-5 h-5 text-gray-400 mr-3 rtl:mr-0 rtl:ml-3" />
                                                    ) : (
                                                        <FiSun className="w-5 h-5 text-gray-400 mr-3 rtl:mr-0 rtl:ml-3" />
                                                    )}
                                                    <span className="text-gray-900 dark:text-white">
                                                        {isArabic ? 'الوضع المظلم' : 'Dark Mode'}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={toggleTheme}
                                                    className="relative inline-flex items-center cursor-pointer"
                                                >
                                                    <div className={`w-11 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'}`}>
                                                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${isArabic
                                                                ? (theme === 'dark' ? 'mr-0.5 -translate-x-5' : 'mr-0.5 translate-x-0')
                                                                : (theme === 'dark' ? 'ml-0.5 translate-x-5' : 'ml-0.5 translate-x-0')
                                                            }`}></div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Danger Zone */}
                                        <div>
                                            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
                                                {isArabic ? 'منطقة الخطر' : 'Danger Zone'}
                                            </h3>
                                            <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-red-900 dark:text-red-100">
                                                            {isArabic ? 'حذف الحساب' : 'Delete Account'}
                                                        </h4>
                                                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                                            {isArabic ? 'حذف حسابك نهائياً مع جميع البيانات' : 'Permanently delete your account and all data'}
                                                        </p>
                                                    </div>
                                                    <button className="flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
                                                        <FiTrash2 className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                        {isArabic ? 'حذف' : 'Delete'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile