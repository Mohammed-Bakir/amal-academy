import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiHome, FiBookOpen, FiSearch, FiArrowLeft } from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'

const NotFound = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()

    const quickLinks = [
        {
            to: '/',
            icon: FiHome,
            label: isArabic ? 'الصفحة الرئيسية' : 'Home',
            description: isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Go back to homepage'
        },
        {
            to: '/courses',
            icon: FiBookOpen,
            label: isArabic ? 'الدورات' : 'Courses',
            description: isArabic ? 'تصفح جميع الدورات المتاحة' : 'Browse all available courses'
        },
        {
            to: '/search',
            icon: FiSearch,
            label: isArabic ? 'البحث' : 'Search',
            description: isArabic ? 'ابحث عن دورات أو مواضيع' : 'Search for courses or topics'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="text-8xl md:text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                        404
                    </div>
                    <div className="w-32 h-1 bg-primary-600 dark:bg-primary-400 mx-auto rounded-full"></div>
                </div>

                {/* Error Message */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    {isArabic
                        ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.'
                        : 'Sorry, the page you are looking for doesn\'t exist or has been moved.'
                    }
                </p>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {quickLinks.map((link) => {
                        const IconComponent = link.icon
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                                        <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {link.label}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {link.description}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                    <FiArrowLeft className={`w-4 h-4 ${isArabic ? 'ml-2 rotate-180' : 'mr-2'}`} />
                    {isArabic ? 'العودة للخلف' : 'Go Back'}
                </button>

                {/* Help Text */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isArabic
                            ? 'إذا كنت تعتقد أن هذا خطأ، يرجى '
                            : 'If you think this is an error, please '
                        }
                        <Link
                            to="/contact"
                            className="text-primary-600 dark:text-primary-400 hover:underline"
                        >
                            {isArabic ? 'تواصل معنا' : 'contact us'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFound