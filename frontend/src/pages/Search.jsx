import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, Link } from 'react-router-dom'
import {
    FiSearch, FiFilter, FiX, FiClock, FiUsers, FiStar, FiTrendingUp,
    FiBookOpen, FiCode, FiEdit3, FiGlobe, FiDatabase, FiCamera, FiTarget
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import { useAuth } from '@contexts/AuthContext'
import api from '@services/api'
import LoadingSpinner from '@components/common/LoadingSpinner'

// Category themes (same as Courses page)
const categoryThemes = {
    'Programming': { gradient: 'from-blue-500 to-blue-600', icon: FiCode },
    'Web Development': { gradient: 'from-green-500 to-green-600', icon: FiGlobe },
    'Design': { gradient: 'from-purple-500 to-purple-600', icon: FiEdit3 },
    'Marketing': { gradient: 'from-orange-500 to-orange-600', icon: FiTrendingUp },
    'Data Science': { gradient: 'from-indigo-500 to-indigo-600', icon: FiDatabase },
    'Languages': { gradient: 'from-pink-500 to-pink-600', icon: FiGlobe },
    'Photography': { gradient: 'from-yellow-500 to-yellow-600', icon: FiCamera },
    'Business': { gradient: 'from-gray-500 to-gray-600', icon: FiTarget }
}

const Search = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { isEnrolledInCourse } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchInputRef = useRef(null)

    // Search state
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [recentSearches, setRecentSearches] = useState([])
    const [popularSearches] = useState([
        'JavaScript', 'React', 'Python', 'Design', 'Marketing', 'Arabic', 'Photography'
    ])

    // Filter state
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        level: searchParams.get('level') || '',
        duration: searchParams.get('duration') || '',
        rating: searchParams.get('rating') || '',
        language: searchParams.get('language') || '',
        price: searchParams.get('price') || ''
    })

    // Results state
    const [sortBy, setSortBy] = useState('relevance')
    const [totalResults, setTotalResults] = useState(0)

    useEffect(() => {
        const query = searchParams.get('q')
        if (query) {
            setSearchQuery(query)
            performSearch(query)
        }
        loadRecentSearches()
    }, [searchParams])

    const loadRecentSearches = () => {
        const recent = JSON.parse(localStorage.getItem('amal-recent-searches') || '[]')
        setRecentSearches(recent.slice(0, 5))
    }
    const saveRecentSearch = (query) => {
        if (!query.trim()) return
        const recent = JSON.parse(localStorage.getItem('amal-recent-searches') || '[]')
        const updated = [query, ...recent.filter(item => item !== query)].slice(0, 10)
        localStorage.setItem('amal-recent-searches', JSON.stringify(updated))
        setRecentSearches(updated.slice(0, 5))
    }

    const performSearch = async (query, newFilters = filters) => {
        if (!query.trim()) {
            setResults([])
            setTotalResults(0)
            return
        }

        setLoading(true)
        try {
            // For now, use placeholder results
            // Later you can uncomment the API call below
            setPlaceholderResults(query, newFilters)

            /* 
            const params = new URLSearchParams({
                search: query,
                ...Object.fromEntries(Object.entries(newFilters).filter(([_, v]) => v))
            })
            
            const response = await api.get(`/courses?${params}`)
            if (response.data.success) {
                setResults(response.data.courses)
                setTotalResults(response.data.total || response.data.courses.length)
            }
            */

            saveRecentSearch(query)
        } catch (error) {
            console.error('Search failed:', error)
            setPlaceholderResults(query, newFilters)
        } finally {
            setLoading(false)
        }
    }

    const setPlaceholderResults = (query, currentFilters) => {
        // Mock search results based on query
        const allCourses = [
            {
                _id: '1', title: 'JavaScript Fundamentals', titleArabic: 'أساسيات جافا سكريبت',
                description: 'Learn JavaScript from scratch with practical examples',
                category: { name: 'Programming' }, level: 'beginner', duration: 480,
                ratings: { average: 4.8, count: 156 }, totalEnrollments: 1250,
                instructor: { firstName: 'Ahmad', lastName: 'Hassan' }, pricing: { type: 'free' }
            },
            {
                _id: '2', title: 'React Development', titleArabic: 'تطوير تطبيقات React',
                description: 'Build modern web applications with React',
                category: { name: 'Web Development' }, level: 'intermediate', duration: 720,
                ratings: { average: 4.6, count: 89 }, totalEnrollments: 890,
                instructor: { firstName: 'Fatima', lastName: 'Al-Zahra' }, pricing: { type: 'free' }
            },
            {
                _id: '3', title: 'Python for Beginners', titleArabic: 'بايثون للمبتدئين',
                description: 'Start your programming journey with Python',
                category: { name: 'Programming' }, level: 'beginner', duration: 600,
                ratings: { average: 4.7, count: 203 }, totalEnrollments: 1456,
                instructor: { firstName: 'Omar', lastName: 'Khalil' }, pricing: { type: 'free' }
            },
            {
                _id: '4', title: 'UI/UX Design Principles', titleArabic: 'مبادئ تصميم واجهات المستخدم',
                description: 'Master the art of user interface and experience design',
                category: { name: 'Design' }, level: 'intermediate', duration: 540,
                ratings: { average: 4.9, count: 134 }, totalEnrollments: 756,
                instructor: { firstName: 'Layla', lastName: 'Mansour' }, pricing: { type: 'free' }
            },
            {
                _id: '5', title: 'Digital Marketing Strategy', titleArabic: 'استراتيجية التسويق الرقمي',
                description: 'Learn effective digital marketing techniques',
                category: { name: 'Marketing' }, level: 'beginner', duration: 360,
                ratings: { average: 4.5, count: 98 }, totalEnrollments: 2100,
                instructor: { firstName: 'Sarah', lastName: 'Johnson' }, pricing: { type: 'free' }
            }
        ]

        // Filter results based on query and filters
        let filtered = allCourses.filter(course =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.titleArabic.includes(query) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.category.name.toLowerCase().includes(query.toLowerCase())
        )

        // Apply filters
        if (currentFilters.category) {
            filtered = filtered.filter(course =>
                course.category.name.toLowerCase().includes(currentFilters.category.toLowerCase())
            )
        }
        if (currentFilters.level) {
            filtered = filtered.filter(course => course.level === currentFilters.level)
        }

        setResults(filtered)
        setTotalResults(filtered.length)
    }
    const handleSearch = (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        const params = new URLSearchParams()
        params.set('q', searchQuery)
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value)
        })

        setSearchParams(params)
        performSearch(searchQuery, filters)
        setShowSuggestions(false)
    }

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)

        if (searchQuery) {
            performSearch(searchQuery, newFilters)
        }
    }

    const clearFilters = () => {
        setFilters({
            category: '', level: '', duration: '', rating: '', language: '', price: ''
        })
        if (searchQuery) {
            performSearch(searchQuery, {})
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion)
        setShowSuggestions(false)
        const params = new URLSearchParams()
        params.set('q', suggestion)
        setSearchParams(params)
        performSearch(suggestion)
    }

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        if (hours > 0) {
            return isArabic ? `${hours} ساعة ${mins} دقيقة` : `${hours}h ${mins}m`
        }
        return isArabic ? `${mins} دقيقة` : `${mins}m`
    }

    const CourseCard = ({ course }) => {
        const theme = categoryThemes[course.category?.name] || categoryThemes['Programming']
        const IconComponent = theme.icon

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-secondary-100 dark:border-gray-700">
                <div className={`h-2 bg-gradient-to-r ${theme.gradient}`}></div>

                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.gradient} bg-opacity-10`}>
                            <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="flex items-center">
                            <FiStar className="text-yellow-400 w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                            <span className="text-sm font-medium text-secondary-700 dark:text-gray-300">
                                {course.ratings?.average?.toFixed(1) || '4.5'}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2">
                        {isArabic ? course.titleArabic || course.title : course.title}
                    </h3>

                    <p className="text-secondary-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-secondary-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                            <FiClock className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                            <span>{formatDuration(course.duration)}</span>
                        </div>
                        <div className="flex items-center">
                            <FiUsers className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                            <span>{course.totalEnrollments?.toLocaleString()}</span>
                        </div>
                        <span className="px-2 py-1 bg-secondary-100 dark:bg-gray-700 rounded text-xs">
                            {course.level}
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-secondary-100 dark:border-gray-700">
                        <div className="flex items-center">
                            <span className="text-sm text-secondary-600 dark:text-gray-400">
                                {course.instructor?.firstName} {course.instructor?.lastName}
                            </span>
                        </div>
                        <Link
                            to={`/courses/${course.slug || course._id}`}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gradient-to-r ${theme.gradient} text-white hover:shadow-lg hover:scale-105`}
                        >
                            {isEnrolledInCourse(course._id)
                                ? (isArabic ? 'متابعة' : 'Continue')
                                : (isArabic ? 'ابدأ الآن' : 'Start Now')
                            }
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                        {t('search.title')}
                    </h1>
                    <p className="text-secondary-600 dark:text-gray-300">
                        {t('search.subtitle')}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-100 dark:border-gray-700 p-6 mb-8">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search.placeholder')}
                                className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-secondary-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-gray-400"
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />

                            {/* Search Suggestions */}
                            {showSuggestions && (searchQuery || recentSearches.length > 0 || popularSearches.length > 0) && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-secondary-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                                    {/* Recent Searches */}
                                    {recentSearches.length > 0 && (
                                        <div className="p-4 border-b border-secondary-100 dark:border-gray-700">
                                            <h4 className="text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                                {t('search.recent')}
                                            </h4>
                                            {recentSearches.map((search, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(search)}
                                                    className="flex items-center w-full text-left px-2 py-1 hover:bg-secondary-50 dark:hover:bg-gray-700 rounded text-sm text-secondary-600 dark:text-gray-300"
                                                >
                                                    <FiClock className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    {search}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Popular Searches */}
                                    {popularSearches.length > 0 && (
                                        <div className="p-4">
                                            <h4 className="text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                                {t('search.popular')}
                                            </h4>
                                            {popularSearches.map((search, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(search)}
                                                    className="flex items-center w-full text-left px-2 py-1 hover:bg-secondary-50 dark:hover:bg-gray-700 rounded text-sm text-secondary-600 dark:text-gray-300"
                                                >
                                                    <FiTrendingUp className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    {search}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-4 py-3 border border-secondary-200 dark:border-gray-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-gray-700 text-secondary-700 dark:text-gray-300"
                        >
                            <FiFilter className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                            {t('search.filters')}
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                        >
                            {t('search.search')}
                        </button>
                    </form>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-secondary-100 dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                        {t('search.category')}
                                    </label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                                    >
                                        <option value="">{t('search.allCategories')}</option>
                                        {Object.keys(categoryThemes).map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Level Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                        {t('search.level')}
                                    </label>
                                    <select
                                        value={filters.level}
                                        onChange={(e) => handleFilterChange('level', e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                                    >
                                        <option value="">{t('search.allLevels')}</option>
                                        <option value="beginner">{t('search.beginner')}</option>
                                        <option value="intermediate">{t('search.intermediate')}</option>
                                        <option value="advanced">{t('search.advanced')}</option>
                                    </select>
                                </div>

                                {/* Duration Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                        {t('search.duration')}
                                    </label>
                                    <select
                                        value={filters.duration}
                                        onChange={(e) => handleFilterChange('duration', e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                                    >
                                        <option value="">{t('search.anyDuration')}</option>
                                        <option value="short">{t('search.short')}</option>
                                        <option value="medium">{t('search.medium')}</option>
                                        <option value="long">{t('search.long')}</option>
                                    </select>
                                </div>

                                {/* Rating Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                        {t('search.rating')}
                                    </label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                                    >
                                        <option value="">{t('search.anyRating')}</option>
                                        <option value="4.5">{t('search.rating45')}</option>
                                        <option value="4.0">{t('search.rating40')}</option>
                                        <option value="3.5">{t('search.rating35')}</option>
                                    </select>
                                </div>

                                {/* Language Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                                        {t('search.language')}
                                    </label>
                                    <select
                                        value={filters.language}
                                        onChange={(e) => handleFilterChange('language', e.target.value)}
                                        className="w-full px-3 py-2 border border-secondary-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-900 dark:text-white"
                                    >
                                        <option value="">{t('search.allLanguages')}</option>
                                        <option value="en">{t('search.english')}</option>
                                        <option value="ar">{t('search.arabic')}</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        className="w-full px-3 py-2 text-sm text-secondary-600 dark:text-gray-300 hover:text-secondary-800 dark:hover:text-white border border-secondary-200 dark:border-gray-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <FiX className="w-4 h-4 mx-auto" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Header */}
                {searchQuery && (
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                                {t('search.resultsFor')} "{searchQuery}"
                            </h2>
                            <p className="text-secondary-600 dark:text-gray-300">
                                {totalResults} {t('search.coursesFound')}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-sm text-secondary-600 dark:text-gray-300">
                                {t('search.sortBy')}:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-secondary-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-900 dark:text-white text-sm"
                            >
                                <option value="relevance">{t('search.relevance')}</option>
                                <option value="rating">{t('search.highestRated')}</option>
                                <option value="newest">{t('search.newest')}</option>
                                <option value="popular">{t('search.mostPopular')}</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner />
                    </div>
                )}

                {/* Search Results */}
                {!loading && results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map(course => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && searchQuery && results.length === 0 && (
                    <div className="text-center py-12">
                        <FiBookOpen className="w-16 h-16 text-secondary-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                            {t('search.noResults')}
                        </h3>
                        <p className="text-secondary-600 dark:text-gray-300 mb-6">
                            {t('search.noResultsDesc')}
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                        >
                            {t('search.clearFilters')}
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !searchQuery && (
                    <div className="text-center py-12">
                        <FiSearch className="w-16 h-16 text-secondary-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                            {t('search.startSearching')}
                        </h3>
                        <p className="text-secondary-600 dark:text-gray-300">
                            {t('search.searchDesc')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search