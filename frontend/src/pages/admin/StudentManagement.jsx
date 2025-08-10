import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    FiSearch, FiFilter, FiDownload, FiMoreVertical, FiEdit,
    FiTrash2, FiMail, FiUser, FiCalendar, FiBookOpen, FiAward,
    FiEye, FiUserPlus, FiUsers, FiTrendingUp, FiClock, FiCheck,
    FiX, FiRefreshCw, FiChevronDown, FiChevronUp
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const StudentManagement = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedStudents, setSelectedStudents] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [studentsPerPage] = useState(10)
    const [sortBy, setSortBy] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock student data
            const mockStudents = [
                {
                    id: 1,
                    name: isArabic ? 'أحمد محمد علي' : 'Ahmed Mohammed Ali',
                    email: 'ahmed.mohammed@email.com',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohammed&background=2563eb&color=fff&size=40',
                    joinDate: '2024-01-15',
                    lastActive: '2024-01-25',
                    coursesEnrolled: 3,
                    coursesCompleted: 1,
                    totalProgress: 67,
                    status: 'active',
                    location: isArabic ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
                    phone: '+966 50 123 4567'
                },
                {
                    id: 2,
                    name: isArabic ? 'فاطمة أحمد حسن' : 'Fatima Ahmed Hassan',
                    email: 'fatima.ahmed@email.com',
                    avatar: 'https://ui-avatars.com/api/?name=Fatima+Ahmed&background=10b981&color=fff&size=40',
                    joinDate: '2024-01-10',
                    lastActive: '2024-01-24',
                    coursesEnrolled: 5,
                    coursesCompleted: 3,
                    totalProgress: 85,
                    status: 'active',
                    location: isArabic ? 'جدة، السعودية' : 'Jeddah, Saudi Arabia',
                    phone: '+966 55 987 6543'
                },
                {
                    id: 3,
                    name: isArabic ? 'محمد عبدالله' : 'Mohammed Abdullah',
                    email: 'mohammed.abdullah@email.com',
                    avatar: 'https://ui-avatars.com/api/?name=Mohammed+Abdullah&background=8b5cf6&color=fff&size=40',
                    joinDate: '2024-01-08',
                    lastActive: '2024-01-20',
                    coursesEnrolled: 2,
                    coursesCompleted: 0,
                    totalProgress: 34,
                    status: 'inactive',
                    location: isArabic ? 'الدمام، السعودية' : 'Dammam, Saudi Arabia',
                    phone: '+966 56 456 7890'
                },
                {
                    id: 4,
                    name: isArabic ? 'نور الهدى' : 'Nour Al-Huda',
                    email: 'nour.alhuda@email.com',
                    avatar: 'https://ui-avatars.com/api/?name=Nour+AlHuda&background=f59e0b&color=fff&size=40',
                    joinDate: '2024-01-12',
                    lastActive: '2024-01-25',
                    coursesEnrolled: 4,
                    coursesCompleted: 2,
                    totalProgress: 78,
                    status: 'active',
                    location: isArabic ? 'مكة، السعودية' : 'Mecca, Saudi Arabia',
                    phone: '+966 54 321 0987'
                },
                {
                    id: 5,
                    name: isArabic ? 'خالد سعد' : 'Khalid Saad',
                    email: 'khalid.saad@email.com',
                    avatar: 'https://ui-avatars.com/api/?name=Khalid+Saad&background=ef4444&color=fff&size=40',
                    joinDate: '2024-01-05',
                    lastActive: '2024-01-18',
                    coursesEnrolled: 1,
                    coursesCompleted: 1,
                    totalProgress: 100,
                    status: 'completed',
                    location: isArabic ? 'المدينة، السعودية' : 'Medina, Saudi Arabia',
                    phone: '+966 53 654 3210'
                }
            ]

            setStudents(mockStudents)
        } catch (error) {
            console.error('Failed to fetch students:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter

        return matchesSearch && matchesFilter
    })

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        let aValue = a[sortBy]
        let bValue = b[sortBy]

        if (sortBy === 'joinDate' || sortBy === 'lastActive') {
            aValue = new Date(aValue)
            bValue = new Date(bValue)
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })

    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent)
    const totalPages = Math.ceil(sortedStudents.length / studentsPerPage)

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        )
    }

    const handleSelectAll = () => {
        if (selectedStudents.length === currentStudents.length) {
            setSelectedStudents([])
        } else {
            setSelectedStudents(currentStudents.map(student => student.id))
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: {
                color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                label: isArabic ? 'نشط' : 'Active'
            },
            inactive: {
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                label: isArabic ? 'غير نشط' : 'Inactive'
            },
            completed: {
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                label: isArabic ? 'مكتمل' : 'Completed'
            }
        }

        const config = statusConfig[status] || statusConfig.active

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.label}
            </span>
        )
    }

    const stats = {
        total: students.length,
        active: students.filter(s => s.status === 'active').length,
        inactive: students.filter(s => s.status === 'inactive').length,
        completed: students.filter(s => s.status === 'completed').length
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
                                {isArabic ? 'إدارة الطلاب' : 'Student Management'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {isArabic ? 'إدارة ومتابعة الطلاب المسجلين' : 'Manage and monitor enrolled students'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                <FiUserPlus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {isArabic ? 'إضافة طالب' : 'Add Student'}
                            </button>
                            <button
                                onClick={fetchStudents}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: isArabic ? 'إجمالي الطلاب' : 'Total Students', value: stats.total, icon: FiUsers, color: 'bg-blue-500' },
                        { title: isArabic ? 'الطلاب النشطون' : 'Active Students', value: stats.active, icon: FiTrendingUp, color: 'bg-green-500' },
                        { title: isArabic ? 'غير النشطين' : 'Inactive Students', value: stats.inactive, icon: FiClock, color: 'bg-yellow-500' },
                        { title: isArabic ? 'المكتملون' : 'Completed Students', value: stats.completed, icon: FiAward, color: 'bg-purple-500' }
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
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="relative">
                                <FiSearch className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder={isArabic ? 'البحث عن الطلاب...' : 'Search students...'}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">{isArabic ? 'جميع الطلاب' : 'All Students'}</option>
                                <option value="active">{isArabic ? 'النشطون' : 'Active'}</option>
                                <option value="inactive">{isArabic ? 'غير النشطين' : 'Inactive'}</option>
                                <option value="completed">{isArabic ? 'المكتملون' : 'Completed'}</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FiDownload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {isArabic ? 'تصدير' : 'Export'}
                            </button>
                            {selectedStudents.length > 0 && (
                                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                    <FiTrash2 className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                    {isArabic ? `حذف (${selectedStudents.length})` : `Delete (${selectedStudents.length})`}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left rtl:text-right">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.length === currentStudents.length && currentStudents.length > 0}
                                            onChange={handleSelectAll}
                                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {isArabic ? 'الطالب' : 'Student'}
                                    </th>
                                    <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {isArabic ? 'تاريخ التسجيل' : 'Join Date'}
                                    </th>
                                    <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {isArabic ? 'الدورات' : 'Courses'}
                                    </th>
                                    <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {isArabic ? 'التقدم' : 'Progress'}
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
                                {currentStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => handleSelectStudent(student.id)}
                                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={student.avatar}
                                                    alt={student.name}
                                                    className="w-10 h-10 rounded-full mr-4 rtl:mr-0 rtl:ml-4"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {student.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {student.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {new Date(student.joinDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {student.coursesEnrolled} {isArabic ? 'مسجل' : 'enrolled'}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {student.coursesCompleted} {isArabic ? 'مكتمل' : 'completed'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2 rtl:mr-0 rtl:ml-2">
                                                    <div
                                                        className="bg-primary-600 h-2 rounded-full"
                                                        style={{ width: `${student.totalProgress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-900 dark:text-white">
                                                    {student.totalProgress}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(student.status)}
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {isArabic ? 'عرض' : 'Showing'} {indexOfFirstStudent + 1} {isArabic ? 'إلى' : 'to'} {Math.min(indexOfLastStudent, sortedStudents.length)} {isArabic ? 'من' : 'of'} {sortedStudents.length} {isArabic ? 'طالب' : 'students'}
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentManagement