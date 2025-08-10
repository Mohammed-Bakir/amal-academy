import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState(() => {
        // Initialize from localStorage or default to Arabic
        return localStorage.getItem('amal-language') || 'ar'
    })
    const [direction, setDirection] = useState(() => {
        const savedLanguage = localStorage.getItem('amal-language') || 'ar'
        return savedLanguage === 'ar' ? 'rtl' : 'ltr'
    })

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage)
        setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr')

        // Safely change i18n language if available
        if (i18n && typeof i18n.changeLanguage === 'function') {
            i18n.changeLanguage(newLanguage)
        }

        localStorage.setItem('amal-language', newLanguage)

        // Update document attributes
        document.documentElement.lang = newLanguage
        document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
    }

    // Initialize i18n language when i18n is ready
    useEffect(() => {
        console.log('LanguageContext: i18n effect triggered', {
            hasI18n: !!i18n,
            language,
            i18nLanguage: i18n?.language,
            isInitialized: i18n?.isInitialized
        })

        if (i18n && typeof i18n.changeLanguage === 'function') {
            // Simple timeout to ensure i18n is ready
            const timer = setTimeout(() => {
                console.log('LanguageContext: Changing language to', language)
                i18n.changeLanguage(language)
                    .then(() => {
                        console.log('LanguageContext: Language changed successfully to', i18n.language)
                    })
                    .catch(console.error)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [i18n, language])

    const toggleLanguage = () => {
        const newLanguage = language === 'ar' ? 'en' : 'ar'
        changeLanguage(newLanguage)
    }

    const value = {
        language,
        direction,
        changeLanguage,
        toggleLanguage,
        isArabic: language === 'ar',
        isEnglish: language === 'en',
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}