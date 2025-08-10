import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
    FiTarget, FiHeart, FiUsers, FiAward, FiGlobe, FiTrendingUp,
    FiBookOpen, FiStar, FiCheck, FiArrowRight
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'

const About = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()

    const stats = [
        {
            icon: FiUsers,
            number: '50,000+',
            label: isArabic ? 'طالب' : 'Students',
            description: isArabic ? 'طالب من جميع أنحاء العالم' : 'students from around the world'
        },
        {
            icon: FiBookOpen,
            number: '500+',
            label: isArabic ? 'دورة' : 'Courses',
            description: isArabic ? 'دورة في مختلف المجالات' : 'courses across various fields'
        },
        {
            icon: FiAward,
            number: '25,000+',
            label: isArabic ? 'شهادة' : 'Certificates',
            description: isArabic ? 'شهادة تم إصدارها' : 'certificates issued'
        },
        {
            icon: FiStar,
            number: '4.8/5',
            label: isArabic ? 'تقييم' : 'Rating',
            description: isArabic ? 'متوسط تقييم الطلاب' : 'average student rating'
        }
    ]

    const values = [
        {
            icon: FiTarget,
            title: isArabic ? 'التميز في التعليم' : 'Excellence in Education',
            description: isArabic
                ? 'نسعى لتقديم أفضل تجربة تعليمية ممكنة من خلال محتوى عالي الجودة ومدربين خبراء.'
                : 'We strive to provide the best possible learning experience through high-quality content and expert instructors.'
        },
        {
            icon: FiHeart,
            title: isArabic ? 'التعلم مدى الحياة' : 'Lifelong Learning',
            description: isArabic
                ? 'نؤمن بأن التعلم رحلة مستمرة ونساعد الطلاب على تطوير مهاراتهم باستمرار.'
                : 'We believe learning is a continuous journey and help students continuously develop their skills.'
        },
        {
            icon: FiGlobe,
            title: isArabic ? 'إمكانية الوصول للجميع' : 'Accessibility for All',
            description: isArabic
                ? 'نجعل التعليم متاحاً للجميع بغض النظر عن الموقع أو الخلفية الاقتصادية.'
                : 'We make education accessible to everyone regardless of location or economic background.'
        },
        {
            icon: FiTrendingUp,
            title: isArabic ? 'النمو المهني' : 'Professional Growth',
            description: isArabic
                ? 'نساعد الطلاب على تحقيق أهدافهم المهنية وتطوير مسيراتهم الوظيفية.'
                : 'We help students achieve their professional goals and advance their careers.'
        }
    ]

    const team = [
        {
            name: isArabic ? 'أحمد محمد' : 'Ahmed Mohammed',
            role: isArabic ? 'المؤسس والرئيس التنفيذي' : 'Founder & CEO',
            image: 'https://ui-avatars.com/api/?name=Ahmed+Mohammed&background=2563eb&color=fff&size=200',
            bio: isArabic
                ? 'خبير في التكنولوجيا التعليمية مع أكثر من 15 عاماً من الخبرة في مجال التعليم.'
                : 'EdTech expert with over 15 years of experience in education and technology.'
        },
        {
            name: isArabic ? 'فاطمة أحمد' : 'Fatima Ahmed',
            role: isArabic ? 'مديرة المحتوى التعليمي' : 'Head of Educational Content',
            image: 'https://ui-avatars.com/api/?name=Fatima+Ahmed&background=10b981&color=fff&size=200',
            bio: isArabic
                ? 'متخصصة في تطوير المناهج التعليمية مع خبرة 12 عاماً في التصميم التعليمي.'
                : 'Curriculum development specialist with 12 years of experience in instructional design.'
        },
        {
            name: isArabic ? 'عمر خالد' : 'Omar Khaled',
            role: isArabic ? 'مدير التكنولوجيا' : 'Chief Technology Officer',
            image: 'https://ui-avatars.com/api/?name=Omar+Khaled&background=8b5cf6&color=fff&size=200',
            bio: isArabic
                ? 'مهندس برمجيات متخصص في تطوير منصات التعلم الإلكتروني.'
                : 'Software engineer specialized in developing e-learning platforms.'
        }
    ]

    const milestones = [
        {
            year: '2020',
            title: isArabic ? 'تأسيس أكاديمية أمل' : 'Amal Academy Founded',
            description: isArabic ? 'بدأنا رحلتنا بهدف جعل التعليم متاحاً للجميع' : 'Started our journey to make education accessible to everyone'
        },
        {
            year: '2021',
            title: isArabic ? 'وصلنا إلى 10,000 طالب' : 'Reached 10,000 Students',
            description: isArabic ? 'تجاوزنا أول معلم مهم في رحلتنا' : 'Crossed our first major milestone'
        },
        {
            year: '2022',
            title: isArabic ? 'إطلاق التطبيق المحمول' : 'Mobile App Launch',
            description: isArabic ? 'جعلنا التعلم متاحاً في أي مكان وزمان' : 'Made learning available anywhere, anytime'
        },
        {
            year: '2023',
            title: isArabic ? 'شراكات دولية' : 'International Partnerships',
            description: isArabic ? 'توسعنا عالمياً من خلال شراكات استراتيجية' : 'Expanded globally through strategic partnerships'
        },
        {
            year: '2024',
            title: isArabic ? '50,000+ طالب' : '50,000+ Students',
            description: isArabic ? 'وصلنا إلى نصف مليون طالب حول العالم' : 'Reached half a million students worldwide'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="container py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {isArabic ? 'من نحن' : 'About Us'}
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-8">
                            {isArabic
                                ? 'نحن نؤمن بقوة التعليم في تغيير الحياة وبناء مستقبل أفضل للجميع'
                                : 'We believe in the power of education to transform lives and build a better future for everyone'
                            }
                        </p>
                        <div className="flex justify-center">
                            <Link
                                to="/courses"
                                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isArabic ? 'ابدأ التعلم الآن' : 'Start Learning Now'}
                                <FiArrowRight className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-white dark:bg-gray-800">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.description}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {isArabic ? 'مهمتنا' : 'Our Mission'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            {isArabic
                                ? 'مهمتنا هي تمكين الأفراد من تحقيق إمكاناتهم الكاملة من خلال توفير تعليم عالي الجودة ومتاح للجميع. نسعى لبناء مجتمع تعليمي يدعم النمو المستمر والتطوير المهني.'
                                : 'Our mission is to empower individuals to reach their full potential by providing high-quality, accessible education. We strive to build a learning community that supports continuous growth and professional development.'
                            }
                        </p>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon
                            return (
                                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                                        <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="py-16 bg-white dark:bg-gray-800">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
                            {isArabic ? 'رحلتنا' : 'Our Journey'}
                        </h2>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>

                            {milestones.map((milestone, index) => (
                                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-gray-800"></div>

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                                            <div className="text-primary-600 dark:text-primary-400 font-bold text-lg mb-2">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {isArabic ? 'فريقنا' : 'Our Team'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {isArabic
                                ? 'تعرف على الأشخاص الذين يعملون بجد لجعل التعليم أفضل للجميع'
                                : 'Meet the people working hard to make education better for everyone'
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {member.name}
                                    </h3>
                                    <div className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                                        {member.role}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-primary-600 dark:bg-primary-800">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {isArabic ? 'انضم إلى مجتمعنا التعليمي' : 'Join Our Learning Community'}
                        </h2>
                        <p className="text-xl opacity-90 mb-8">
                            {isArabic
                                ? 'ابدأ رحلتك التعليمية اليوم واكتشف إمكانياتك اللامحدودة'
                                : 'Start your learning journey today and discover your unlimited potential'
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isArabic ? 'إنشاء حساب مجاني' : 'Create Free Account'}
                            </Link>
                            <Link
                                to="/courses"
                                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                            >
                                {isArabic ? 'تصفح الدورات' : 'Browse Courses'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About