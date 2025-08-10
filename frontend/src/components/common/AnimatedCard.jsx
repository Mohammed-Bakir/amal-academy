import React from 'react'
import { motion } from 'framer-motion'

const AnimatedCard = ({
    children,
    className = '',
    hover = true,
    glow = false,
    lift = true,
    onClick,
    delay = 0,
    ...props
}) => {
    const cardVariants = {
        initial: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay,
                ease: 'easeOut'
            }
        },
        hover: {
            y: lift ? -8 : 0,
            scale: hover ? 1.02 : 1,
            boxShadow: glow
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(37, 99, 235, 0.3)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: {
                duration: 0.3,
                ease: 'easeOut'
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: 0.1,
                ease: 'easeOut'
            }
        }
    }

    const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'

    return (
        <motion.div
            className={`${baseClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover={hover ? "hover" : undefined}
            whileTap={onClick ? "tap" : undefined}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Specialized card variants
export const CourseCard = ({ children, className = '', ...props }) => (
    <AnimatedCard
        className={`group ${className}`}
        hover={true}
        lift={true}
        glow={false}
        {...props}
    >
        {children}
    </AnimatedCard>
)

export const StatCard = ({ children, className = '', ...props }) => (
    <AnimatedCard
        className={className}
        hover={true}
        lift={false}
        glow={true}
        {...props}
    >
        {children}
    </AnimatedCard>
)

export const FeatureCard = ({ children, className = '', delay = 0, ...props }) => (
    <AnimatedCard
        className={className}
        hover={true}
        lift={true}
        glow={false}
        delay={delay}
        {...props}
    >
        {children}
    </AnimatedCard>
)

export default AnimatedCard