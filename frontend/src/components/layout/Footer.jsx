import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiBookOpen, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail } from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'

const Footer = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/courses', label: t('nav.courses') },
        { to: '/categories', label: t('nav.categories') },
        { to: '/about', label: t('nav.about') },
        { to: '/contact', label: t('nav.contact') },
    ]

    const categories = [
        { to: '/categories/programming', label: isArabic ? 'البرمجة' : 'Programming' },
        { to: '/categories/design', label: isArabic ? 'التصميم' : 'Design' },
        { to: '/categories/business', label: isArabic ? 'الأعمال' : 'Business' },
        { to: '/categories/languages', label: isArabic ? 'اللغات' : 'Languages' },
        { to: '/categories/marketing', label: isArabic ? 'التسويق' : 'Marketing' },
    ]

    const support = [
        { to: '/help', label: isArabic ? 'مساعدة' : 'Help Center' },
        { to: '/faq', label: isArabic ? 'الأسئلة الشائعة' : 'FAQ' },
        { to: '/support', label: isArabic ? 'الدعم الفني' : 'Technical Support' },
        { to: '/community', label: isArabic ? 'المجتمع' : 'Community' },
    ]

    const legal = [
        { to: '/privacy', label: t('common.privacy') },
        { to: '/terms', label: t('common.terms') },
        { to: '/cookies', label: isArabic ? 'سياسة الكوكيز' : 'Cookie Policy' },
    ]

    const socialLinks = [
        { href: 'https://facebook.com/amalacademy', icon: FiFacebook, label: 'Facebook' },
        { href: 'https://twitter.com/amalacademy', icon: FiTwitter, label: 'Twitter' },
        { href: 'https://instagram.com/amalacademy', icon: FiInstagram, label: 'Instagram' },
        { href: 'https://youtube.com/amalacademy', icon: FiYoutube, label: 'YouTube' },
    ]

    return (
        <footer className="footer">
            <div className="container">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                    <FiBookOpen className="text-white text-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white">
                                        {isArabic ? 'أكاديمية الأمل' : 'Amal Academy'}
                                    </span>
                                </div>
                            </Link>

                            <p className="text-secondary-300 mb-6 max-w-md">
                                {t('footer.description')}
                            </p>

                            {/* Newsletter */}
                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">{t('footer.newsletter')}</h4>
                                <p className="text-secondary-300 text-sm mb-4">
                                    {t('footer.newsletterText')}
                                </p>
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
                                        className="flex-1 px-4 py-2 rounded-l-lg rtl:rounded-l-none rtl:rounded-r-lg bg-secondary-800 border border-secondary-700 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <button className="px-6 py-2 bg-primary-600 text-white rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg hover:bg-primary-700 transition-colors">
                                        {t('footer.subscribe')}
                                    </button>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-white font-semibold mb-3">{t('footer.followUs')}</h4>
                                <div className="flex space-x-4 rtl:space-x-reverse">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon
                                        return (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center text-secondary-300 hover:text-white hover:bg-primary-600 transition-colors"
                                                aria-label={social.label}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="text-secondary-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">{t('footer.categories')}</h4>
                            <ul className="space-y-3">
                                {categories.map((category) => (
                                    <li key={category.to}>
                                        <Link
                                            to={category.to}
                                            className="text-secondary-300 hover:text-white transition-colors"
                                        >
                                            {category.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support & Legal */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">{t('footer.support')}</h4>
                            <ul className="space-y-3 mb-6">
                                {support.map((item) => (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className="text-secondary-300 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h4 className="text-white font-semibold mb-4">{t('footer.legal')}</h4>
                            <ul className="space-y-3">
                                {legal.map((item) => (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className="text-secondary-300 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-secondary-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-secondary-400 text-sm">
                            {t('footer.copyright', { year: currentYear })}
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
                            <a
                                href="mailto:info@amalacademy.com"
                                className="flex items-center space-x-2 rtl:space-x-reverse text-secondary-400 hover:text-white transition-colors"
                            >
                                <FiMail className="w-4 h-4" />
                                <span className="text-sm">info@amalacademy.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer