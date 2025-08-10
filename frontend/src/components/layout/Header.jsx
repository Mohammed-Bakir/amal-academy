import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiMenu,
    FiX,
    FiUser,
    FiLogOut,
    FiSettings,
    FiBookOpen,
    FiGlobe,
    FiMoon,
    FiSun,
} from 'react-icons/fi'

import { useAuth } from '@contexts/AuthContext'
import { useLanguage } from '@contexts/LanguageContext'
import { useTheme } from '@contexts/ThemeContext'

const Header = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuth()
    const { language, toggleLanguage, isArabic } = useLanguage()
    const { theme, toggleTheme, isDark } = useTheme()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        setIsUserMenuOpen(false)
        navigate('/')
    }

    const navLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/courses', label: t('nav.courses') },
        { to: '/categories', label: t('nav.categories') },
        { to: '/search', label: t('nav.search', 'Search') },
        { to: '/about', label: t('nav.about') },
        { to: '/contact', label: t('nav.contact') },
    ]

    return (
        <header className="header">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <FiBookOpen className="text-white text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-secondary-900 dark:text-white">
                                {isArabic ? 'أكاديمية الأمل' : 'Amal Academy'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="nav-link"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                            title={isArabic ? 'English' : 'العربية'}
                        >
                            <FiGlobe className="w-5 h-5" />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                            title={isDark ? t('common.lightMode') : t('common.darkMode')}
                        >
                            {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>

                        {/* User Menu or Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user?.firstName?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-secondary-700 dark:text-gray-300">
                                        {user?.firstName}
                                    </span>
                                </button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-medium border border-secondary-200 dark:border-gray-700 py-2 z-50"
                                        >
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-secondary-700 dark:text-gray-300 hover:bg-secondary-50 dark:hover:bg-gray-700"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <FiBookOpen className="w-4 h-4" />
                                                <span>{t('nav.dashboard')}</span>
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-secondary-700 dark:text-gray-300 hover:bg-secondary-50 dark:hover:bg-gray-700"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <FiUser className="w-4 h-4" />
                                                <span>{t('nav.profile')}</span>
                                            </Link>
                                            {/* Admin Panel Link - Only show for instructors and admins */}
                                            {(user?.role === 'instructor' || user?.role === 'admin') && (
                                                <Link
                                                    to="/admin"
                                                    className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-accent-gold-600 dark:text-accent-gold-400 hover:bg-accent-gold-50 dark:hover:bg-accent-gold-900/20 font-medium"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <FiSettings className="w-4 h-4" />
                                                    <span>{isArabic ? 'لوحة الإدارة' : 'Admin Panel'}</span>
                                                </Link>
                                            )}
                                            <Link
                                                to="/settings"
                                                className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-secondary-700 dark:text-gray-300 hover:bg-secondary-50 dark:hover:bg-gray-700"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <FiSettings className="w-4 h-4" />
                                                <span>{t('nav.settings')}</span>
                                            </Link>
                                            <hr className="my-2 border-secondary-200 dark:border-gray-600" />
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-red-900/20 w-full text-left rtl:text-right"
                                            >
                                                <FiLogOut className="w-4 h-4" />
                                                <span>{t('common.logout')}</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse">
                                <Link
                                    to="/login"
                                    className="btn btn-ghost"
                                >
                                    {t('common.login')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-primary"
                                >
                                    {t('common.register')}
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                        >
                            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-secondary-200 py-4"
                        >
                            <nav className="flex flex-col space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="text-secondary-700 hover:text-primary-600 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {!isAuthenticated && (
                                    <div className="flex flex-col space-y-2 pt-4 border-t border-secondary-200">
                                        <Link
                                            to="/login"
                                            className="btn btn-ghost justify-center"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t('common.login')}
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="btn btn-primary justify-center"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t('common.register')}
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default Header