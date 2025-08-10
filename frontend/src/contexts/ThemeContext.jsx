import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('amal-theme')
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(prefersDark ? 'dark' : 'light')
        }
    }, [])

    // Update document class when theme changes
    useEffect(() => {
        document.documentElement.className = `theme-${theme}`
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const changeTheme = (newTheme) => {
        setTheme(newTheme)
        localStorage.setItem('amal-theme', newTheme)
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        changeTheme(newTheme)
    }

    const value = {
        theme,
        changeTheme,
        toggleTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}