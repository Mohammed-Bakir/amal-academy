import React from 'react'
import { motion } from 'framer-motion'

const AnimatedButton = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    icon: Icon,
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 shadow-sm hover:shadow-md',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
        ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-primary-500 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700',
        gradient: 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 focus:ring-primary-500 shadow-sm hover:shadow-md'
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg'
    }

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2, ease: 'easeOut' }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1, ease: 'easeOut' }
        }
    }

    const rippleVariants = {
        initial: { scale: 0, opacity: 0.5 },
        animate: {
            scale: 4,
            opacity: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    }

    const handleClick = (e) => {
        if (disabled || loading) return

        // Create ripple effect
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        const ripple = document.createElement('span')
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `

        button.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)

        if (onClick) onClick(e)
    }

    return (
        <motion.button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            variants={buttonVariants}
            initial="initial"
            whileHover={!disabled && !loading ? "hover" : "initial"}
            whileTap={!disabled && !loading ? "tap" : "initial"}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </motion.div>
            )}

            <motion.div
                className={`flex items-center ${loading ? 'opacity-0' : 'opacity-100'}`}
                transition={{ duration: 0.2 }}
            >
                {Icon && (
                    <motion.div
                        className="mr-2 rtl:mr-0 rtl:ml-2"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon className="w-4 h-4" />
                    </motion.div>
                )}
                {children}
            </motion.div>
        </motion.button>
    )
}

export default AnimatedButton