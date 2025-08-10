import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
    FiPlay,
    FiBookOpen,
    FiUsers,
    FiAward,
    FiGlobe,
    FiClock,
    FiDollarSign,
    FiArrowRight,
} from 'react-icons/fi'

import { useLanguage } from '@contexts/LanguageContext'
import PageTransition from '@components/common/PageTransition'
import ScrollAnimation, { FadeInSection, ScaleInCard, SlideInLeft, SlideInRight } from '@components/common/ScrollAnimation'
import AnimatedButton from '@components/common/AnimatedButton'
import AnimatedCard, { FeatureCard, StatCard } from '@components/common/AnimatedCard'

const Home = () => {
    const { t, ready } = useTranslation()
    const { isArabic } = useLanguage()

    // Show loading until translations are ready
    if (!ready) {
        return (
            <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-secondary-600">Loading...</p>
                </div>
            </div>
        )
    }

    const features = [
        {
            icon: FiGlobe,
            title: t('home.features.items.bilingual.title'),
            description: t('home.features.items.bilingual.description'),
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            icon: FiBookOpen,
            title: t('home.features.items.practical.title'),
            description: t('home.features.items.practical.description'),
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            icon: FiUsers,
            title: t('home.features.items.community.title'),
            description: t('home.features.items.community.description'),
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            icon: FiAward,
            title: t('home.features.items.certificates.title'),
            description: t('home.features.items.certificates.description'),
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        {
            icon: FiClock,
            title: t('home.features.items.flexible.title'),
            description: t('home.features.items.flexible.description'),
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
        },
        {
            icon: FiDollarSign,
            title: t('home.features.items.affordable.title'),
            description: t('home.features.items.affordable.description'),
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
        },
    ]

    const stats = [
        { number: '10,000+', label: isArabic ? 'طالب' : 'Students' },
        { number: '500+', label: isArabic ? 'دورة' : 'Courses' },
        { number: '50+', label: isArabic ? 'مدرب' : 'Instructors' },
        { number: '95%', label: isArabic ? 'معدل الرضا' : 'Satisfaction Rate' },
    ]

    return (
        <PageTransition className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-primary text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <SlideInLeft>
                            <motion.h1
                                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                {t('home.hero.title')}
                            </motion.h1>
                            <motion.p
                                className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                {t('home.hero.subtitle')}
                            </motion.p>
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                            >
                                <AnimatedButton
                                    variant="secondary"
                                    size="lg"
                                    icon={FiBookOpen}
                                    onClick={() => window.location.href = '/courses'}
                                    className="bg-white text-primary-600 hover:bg-gray-50"
                                >
                                    {t('home.hero.cta')}
                                </AnimatedButton>
                                <AnimatedButton
                                    variant="ghost"
                                    size="lg"
                                    icon={FiPlay}
                                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600"
                                >
                                    {t('home.hero.watchIntro')}
                                </AnimatedButton>
                            </motion.div>
                        </SlideInLeft>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-video bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                <FiPlay className="w-16 h-16 text-white/80" />
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container">
                    <FadeInSection>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    delay={index * 0.1}
                                    className="text-center p-6 hover:scale-105 transition-transform duration-300"
                                >
                                    <motion.div
                                        className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-accent-green-400 mb-2"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{
                                            delay: index * 0.1 + 0.3,
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 10
                                        }}
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-secondary-600 dark:text-gray-400 font-medium">
                                        {stat.label}
                                    </div>
                                </StatCard>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Features Section */}
            <section className="section bg-gray-900 dark:bg-black">
                <div className="container">
                    <FadeInSection className="text-center mb-16">
                        <motion.h2
                            className="section-title text-white mb-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {t('home.features.title')}
                        </motion.h2>
                        <motion.p
                            className="section-subtitle max-w-3xl mx-auto text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {t('home.features.subtitle')}
                        </motion.p>
                    </FadeInSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <FeatureCard
                                    key={index}
                                    delay={index * 0.2}
                                    className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-amber-800 p-8 text-center hover:shadow-2xl hover:shadow-yellow-600/30 transition-all duration-300 border border-yellow-500/20"
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-white mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/90 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </FeatureCard>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container text-center relative z-10">
                    <FadeInSection>
                        <motion.h2
                            className="text-3xl lg:text-4xl font-bold mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                        >
                            {t('home.cta.title')}
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {t('home.cta.subtitle')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <AnimatedButton
                                variant="secondary"
                                size="xl"
                                icon={FiArrowRight}
                                onClick={() => window.location.href = '/register'}
                                className="bg-white text-primary-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl"
                            >
                                {t('home.cta.button')}
                            </AnimatedButton>
                        </motion.div>
                    </FadeInSection>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </section>
        </PageTransition>
    )
}

export default Home