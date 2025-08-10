import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageCircle,
    FiHelpCircle, FiUsers, FiBookOpen, FiAward, FiCheck, FiChevronDown,
    FiChevronUp, FiFacebook, FiTwitter, FiInstagram, FiLinkedin
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const Contact = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()

    console.log('NEW Contact component loaded!')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            setSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '', category: 'general' })
        } catch (error) {
            console.error('Failed to send message:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const contactInfo = [
        {
            icon: FiMail,
            title: isArabic ? 'البريد الإلكتروني' : 'Email',
            value: 'info@amalacademy.com',
            description: isArabic ? 'راسلنا في أي وقت' : 'Send us an email anytime'
        },
        {
            icon: FiPhone,
            title: isArabic ? 'الهاتف' : 'Phone',
            value: '+966 11 123 4567',
            description: isArabic ? 'اتصل بنا من 9 صباحاً إلى 6 مساءً' : 'Call us 9 AM - 6 PM'
        },
        {
            icon: FiMapPin,
            title: isArabic ? 'العنوان' : 'Address',
            value: isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
            description: isArabic ? 'مقرنا الرئيسي' : 'Our main office'
        },
        {
            icon: FiClock,
            title: isArabic ? 'ساعات العمل' : 'Working Hours',
            value: isArabic ? 'الأحد - الخميس' : 'Sunday - Thursday',
            description: isArabic ? '9:00 صباحاً - 6:00 مساءً' : '9:00 AM - 6:00 PM'
        }
    ]

    const categories = [
        { value: 'general', label: isArabic ? 'استفسار عام' : 'General Inquiry' },
        { value: 'technical', label: isArabic ? 'دعم تقني' : 'Technical Support' },
        { value: 'courses', label: isArabic ? 'الدورات' : 'Courses' },
        { value: 'billing', label: isArabic ? 'الفواتير' : 'Billing' },
        { value: 'partnership', label: isArabic ? 'شراكة' : 'Partnership' }
    ]

    const faqs = [
        {
            question: isArabic ? 'كيف يمكنني التسجيل في دورة؟' : 'How can I enroll in a course?',
            answer: isArabic
                ? 'يمكنك التسجيل في أي دورة من خلال إنشاء حساب مجاني والنقر على زر "التسجيل" في صفحة الدورة.'
                : 'You can enroll in any course by creating a free account and clicking the "Enroll" button on the course page.'
        },
        {
            question: isArabic ? 'هل الدورات مجانية؟' : 'Are the courses free?',
            answer: isArabic
                ? 'نعم، جميع دوراتنا مجانية تماماً. نؤمن بأن التعليم حق للجميع.'
                : 'Yes, all our courses are completely free. We believe education should be accessible to everyone.'
        },
        {
            question: isArabic ? 'هل أحصل على شهادة بعد إكمال الدورة؟' : 'Do I get a certificate after completing a course?',
            answer: isArabic
                ? 'نعم، ستحصل على شهادة إتمام معتمدة بعد إنهاء جميع دروس الدورة بنجاح.'
                : 'Yes, you will receive a verified certificate of completion after successfully finishing all course lessons.'
        },
        {
            question: isArabic ? 'كم من الوقت أحتاج لإكمال دورة؟' : 'How long does it take to complete a course?',
            answer: isArabic
                ? 'يختلف وقت إكمال الدورة حسب طولها ووتيرة تعلمك. يمكنك التعلم بالسرعة التي تناسبك.'
                : 'Course completion time varies depending on the course length and your learning pace. You can learn at your own speed.'
        },
        {
            question: isArabic ? 'هل يمكنني الوصول للدورات من الهاتف؟' : 'Can I access courses on mobile?',
            answer: isArabic
                ? 'نعم، منصتنا متوافقة مع جميع الأجهزة ويمكنك الوصول للدورات من الهاتف أو الكمبيوتر.'
                : 'Yes, our platform is fully responsive and you can access courses from any device - mobile, tablet, or desktop.'
        },
        {
            question: isArabic ? 'كيف يمكنني التواصل مع المدربين؟' : 'How can I contact instructors?',
            answer: isArabic
                ? 'يمكنك التواصل مع المدربين من خلال قسم التعليقات في كل درس أو عبر منتدى النقاش.'
                : 'You can contact instructors through the comments section in each lesson or via the discussion forum.'
        }
    ]

    const stats = [
        { icon: FiUsers, value: '50,000+', label: isArabic ? 'طالب' : 'Students' },
        { icon: FiBookOpen, value: '200+', label: isArabic ? 'دورة' : 'Courses' },
        { icon: FiAward, value: '15,000+', label: isArabic ? 'شهادة' : 'Certificates' },
        { icon: FiUsers, value: '100+', label: isArabic ? 'مدرب' : 'Instructors' }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {isArabic ? 'تواصل معنا' : 'Get in Touch'}
                        </h1>
                        <p className="text-xl opacity-90 mb-8">
                            {isArabic
                                ? 'نحن هنا لمساعدتك في رحلتك التعليمية. لا تتردد في التواصل معنا'
                                : 'We\'re here to help you on your learning journey. Don\'t hesitate to reach out'
                            }
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {stats.map((stat, index) => {
                                const IconComponent = stat.icon
                                return (
                                    <div key={index} className="text-center">
                                        <IconComponent className="w-8 h-8 mx-auto mb-2 opacity-80" />
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-sm opacity-80">{stat.label}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-6">
                                <FiMessageCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 rtl:mr-0 rtl:ml-3" />
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {isArabic ? 'أرسل لنا رسالة' : 'Send us a Message'}
                                </h2>
                            </div>

                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {isArabic ? 'تم إرسال رسالتك!' : 'Message Sent!'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        {isArabic
                                            ? 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.'
                                            : 'Thank you for contacting us. We\'ll get back to you as soon as possible.'
                                        }
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="btn btn-primary"
                                    >
                                        {isArabic ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                {isArabic ? 'الاسم' : 'Name'} *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder={isArabic ? 'اسمك الكامل' : 'Your full name'}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                {isArabic ? 'البريد الإلكتروني' : 'Email'} *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder={isArabic ? 'بريدك الإلكتروني' : 'your@email.com'}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {isArabic ? 'نوع الاستفسار' : 'Category'}
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        >
                                            {categories.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {isArabic ? 'الموضوع' : 'Subject'} *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder={isArabic ? 'موضوع رسالتك' : 'What is this about?'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {isArabic ? 'الرسالة' : 'Message'} *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                            placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? (
                                            <LoadingSpinner size="small" className="mr-2 rtl:mr-0 rtl:ml-2" />
                                        ) : (
                                            <FiSend className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                        )}
                                        {loading
                                            ? (isArabic ? 'جاري الإرسال...' : 'Sending...')
                                            : (isArabic ? 'إرسال الرسالة' : 'Send Message')
                                        }
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {isArabic ? 'معلومات التواصل' : 'Contact Information'}
                            </h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => {
                                    const IconComponent = info.icon
                                    return (
                                        <div key={index} className="flex items-start">
                                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0">
                                                <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    {info.title}
                                                </h3>
                                                <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                                                    {info.value}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {info.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {isArabic ? 'تابعنا' : 'Follow Us'}
                            </h2>
                            <div className="flex space-x-4 rtl:space-x-reverse">
                                {[
                                    { icon: FiFacebook, color: 'bg-blue-600 hover:bg-blue-700', label: 'Facebook' },
                                    { icon: FiTwitter, color: 'bg-sky-500 hover:bg-sky-600', label: 'Twitter' },
                                    { icon: FiInstagram, color: 'bg-pink-600 hover:bg-pink-700', label: 'Instagram' },
                                    { icon: FiLinkedin, color: 'bg-blue-700 hover:bg-blue-800', label: 'LinkedIn' }
                                ].map((social, index) => {
                                    const IconComponent = social.icon
                                    return (
                                        <a
                                            key={index}
                                            href="#"
                                            className={`w-12 h-12 ${social.color} text-white rounded-lg flex items-center justify-center transition-colors`}
                                            aria-label={social.label}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <div className="text-center mb-12">
                        <FiHelpCircle className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {isArabic
                                ? 'إجابات على الأسئلة الأكثر شيوعاً حول منصة أمل الأكاديمية'
                                : 'Find answers to the most common questions about Amal Academy'
                            }
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <span className="font-medium text-gray-900 dark:text-white pr-4 rtl:pr-0 rtl:pl-4">
                                            {faq.question}
                                        </span>
                                        {expandedFaq === index ? (
                                            <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                        ) : (
                                            <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                        )}
                                    </button>
                                    {expandedFaq === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact