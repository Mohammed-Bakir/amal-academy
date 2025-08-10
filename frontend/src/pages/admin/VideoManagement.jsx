import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    FiVideo, FiUpload, FiPlay, FiPause, FiEdit, FiTrash2,
    FiMoreVertical, FiSearch, FiFilter, FiDownload, FiEye,
    FiClock, FiUsers, FiPlus, FiRefreshCw,
    FiFolder, FiFile, FiCalendar, FiTrendingUp, FiCheck,
    FiX, FiAlertCircle, FiSettings
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const VideoManagement = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()

    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [selectedVideos, setSelectedVideos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [videosPerPage] = useState(12)
    const [viewMode, setViewMode] = useState('grid') // grid or list
    const [showUploadModal, setShowUploadModal] = useState(false)

    useEffect(() => {
        fetchVideos()
    }, [])

    const fetchVideos = async () => {
        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock video data
            const mockVideos = [
                {
                    id: 1,
                    title: isArabic ? 'مقدمة في البرمجة - الدرس الأول' : 'Introduction to Programming - Lesson 1',
                    description: isArabic ? 'تعلم أساسيات البرمجة من الصفر' : 'Learn programming basics from scratch',
                    thumbnail: 'https://picsum.photos/320/180?random=1',
                    duration: '15:30',
                    views: 2547,
                    likes: 234,
                    uploadDate: '2024-01-15',
                    status: 'published',
                    category: 'programming',
                    course: isArabic ? 'مقدمة في البرمجة' : 'Introduction to Programming',
                    instructor: isArabic ? 'أحمد حسن' : 'Ahmed Hassan',
                    size: '125 MB',
                    quality: '1080p'
                },
                {
                    id: 2,
                    title: isArabic ? 'HTML الأساسيات' : 'HTML Fundamentals',
                    description: isArabic ? 'تعلم لغة HTML لبناء المواقع' : 'Learn HTML for web development',
                    thumbnail: 'https://picsum.photos/320/180?random=2',
                    duration: '22:45',
                    views: 1834,
                    likes: 187,
                    uploadDate: '2024-01-12',
                    status: 'published',
                    category: 'web-development',
                    course: isArabic ? 'تطوير المواقع' : 'Web Development',
                    instructor: isArabic ? 'فاطمة الزهراء' : 'Fatima Al-Zahra',
                    size: '180 MB',
                    quality: '1080p'
                },
                {
                    id: 3,
                    title: isArabic ? 'مبادئ التصميم' : 'Design Principles',
                    description: isArabic ? 'أساسيات التصميم الجرافيكي' : 'Graphic design fundamentals',
                    thumbnail: 'https://picsum.photos/320/180?random=3',
                    duration: '18:20',
                    views: 1456,
                    likes: 156,
                    uploadDate: '2024-01-10',
                    status: 'draft',
                    category: 'design',
                    course: isArabic ? 'تصميم الواجهات' : 'UI/UX Design',
                    instructor: isArabic ? 'ليلى منصور' : 'Layla Mansour',
                    size: '95 MB',
                    quality: '720p'
                },
                {
                    id: 4,
                    title: isArabic ? 'استراتيجيات التسويق' : 'Marketing Strategies',
                    description: isArabic ? 'خطط التسويق الفعالة' : 'Effective marketing plans',
                    thumbnail: 'https://picsum.photos/320/180?random=4',
                    duration: '25:10',
                    views: 987,
                    likes: 89,
                    uploadDate: '2024-01-08',
                    status: 'processing',
                    category: 'marketing',
                    course: isArabic ? 'التسويق الرقمي' : 'Digital Marketing',
                    instructor: isArabic ? 'عمر خليل' : 'Omar Khalil',
                    size: '210 MB',
                    quality: '1080p'
                }
            ]

            setVideos(mockVideos)
        } catch (error) {
            console.error('Failed to fetch videos:', error)
        } finally {
            setLoading(false)
        }
    }

    const categories = [
        { value: 'all', label: isArabic ? 'جميع الفئات' : 'All Categories' },
        { value: 'programming', label: isArabic ? 'البرمجة' : 'Programming' },
        { value: 'web-development', label: isArabic ? 'تطوير المواقع' : 'Web Development' },
        { value: 'design', label: isArabic ? 'التصميم' : 'Design' },
        { value: 'marketing', label: isArabic ? 'التسويق' : 'Marketing' }
    ]

    const statuses = [
        { value: 'all', label: isArabic ? 'جميع الحالات' : 'All Statuses' },
        { value: 'published', label: isArabic ? 'منشور' : 'Published' },
        { value: 'draft', label: isArabic ? 'مسودة' : 'Draft' },
        { value: 'processing', label: isArabic ? 'قيد المعالجة' : 'Processing' }
    ]

    const filteredVideos = videos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
        const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus

        return matchesSearch && matchesCategory && matchesStatus
    })

    const indexOfLastVideo = currentPage * videosPerPage
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage
    const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
    const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: {
                color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                icon: FiCheck,
                label: isArabic ? 'منشور' : 'Published'
            },
            draft: {
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                icon: FiEdit,
                label: isArabic ? 'مسودة' : 'Draft'
            },
            processing: {
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                icon: FiRefreshCw,
                label: isArabic ? 'قيد المعالجة' : 'Processing'
            }
        }

        const config = statusConfig[status] || statusConfig.draft
        const IconComponent = config.icon

        return (
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                <IconComponent className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                {config.label}
            </span>
        )
    }

    const formatDuration = (duration) => {
        return duration
    }

    const formatViews = (views) => {
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`
        }
        return views.toString()
    }

    const stats = {
        total: videos.length,
        published: videos.filter(v => v.status === 'published').length,
        draft: videos.filter(v => v.status === 'draft').length,
        processing: videos.filter(v => v.status === 'processing').length,
        totalViews: videos.reduce((sum, v) => sum + v.views, 0),
        totalDuration: videos.length * 20 // Mock calculation
    }

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
                                {isArabic ? 'إدارة الفيديوهات' : 'Video Management'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? 'إدارة ومتابعة محتوى الفيديو' : 'Manage and monitor video content'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                <FiUpload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {isArabic ? 'رفع فيديو' : 'Upload Video'}
                            </button>
                            <button
                                onClick={fetchVideos}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <FiRefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: isArabic ? 'إجمالي الفيديوهات' : 'Total Videos', value: stats.total, icon: FiVideo, color: 'bg-blue-500' },
                        { title: isArabic ? 'المنشورة' : 'Published', value: stats.published, icon: FiCheck, color: 'bg-green-500' },
                        { title: isArabic ? 'إجمالي المشاهدات' : 'Total Views', value: formatViews(stats.totalViews), icon: FiEye, color: 'bg-purple-500' },
                        { title: isArabic ? 'إجمالي المدة' : 'Total Duration', value: `${stats.totalDuration}h`, icon: FiClock, color: 'bg-orange-500' }
                    ].map((stat, index) => {
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
                                    </div>
                                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Filters and Search */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                            <div className="relative">
                                <FiSearch className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder={isArabic ? 'البحث عن الفيديوهات...' : 'Search videos...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {statuses.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    <FiFolder className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    <FiFile className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FiDownload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {isArabic ? 'تصدير' : 'Export'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Videos Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentVideos.map((video) => (
                            <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                        <button className="opacity-0 hover:opacity-100 transition-opacity duration-300 w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                            <FiPlay className="text-primary-600 text-xl ml-1" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                    <div className="absolute top-2 left-2">
                                        {getStatusBadge(video.status)}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                        {video.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <div className="flex items-center">
                                            <FiEye className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                                            <span>{formatViews(video.views)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiCalendar className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                                            <span>{new Date(video.uploadDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {video.instructor}
                                        </span>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                                <FiEye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {isArabic ? 'الفيديو' : 'Video'}
                                        </th>
                                        <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {isArabic ? 'الدورة' : 'Course'}
                                        </th>
                                        <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {isArabic ? 'المدة' : 'Duration'}
                                        </th>
                                        <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {isArabic ? 'المشاهدات' : 'Views'}
                                        </th>
                                        <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {isArabic ? 'الحالة' : 'Status'}
                                        </th>
                                        <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {isArabic ? 'إجراءات' : 'Actions'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentVideos.map((video) => (
                                        <tr key={video.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        className="w-16 h-10 rounded object-cover mr-4 rtl:mr-0 rtl:ml-4"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                                            {video.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {video.instructor}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {video.course}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {video.duration}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {formatViews(video.views)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(video.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                                                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300">
                                                        <FiEye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                                        <FiEdit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                                        <FiMoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                {isArabic ? 'عرض' : 'Showing'} {indexOfFirstVideo + 1} {isArabic ? 'إلى' : 'to'} {Math.min(indexOfLastVideo, filteredVideos.length)} {isArabic ? 'من' : 'of'} {filteredVideos.length} {isArabic ? 'فيديو' : 'videos'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isArabic ? 'السابق' : 'Previous'}
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 text-sm rounded ${currentPage === page
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isArabic ? 'التالي' : 'Next'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoManagement