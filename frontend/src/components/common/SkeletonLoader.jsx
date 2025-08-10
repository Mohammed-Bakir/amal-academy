import React from 'react'
import { motion } from 'framer-motion'

const SkeletonLoader = ({
    width = 'w-full',
    height = 'h-4',
    className = '',
    rounded = 'rounded',
    animate = true
}) => {
    const shimmerVariants = {
        initial: { x: '-100%' },
        animate: {
            x: '100%',
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear'
            }
        }
    }

    return (
        <div className={`${width} ${height} ${rounded} bg-gray-200 dark:bg-gray-700 overflow-hidden relative ${className}`}>
            {animate && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                />
            )}
        </div>
    )
}

// Preset skeleton components
export const SkeletonCard = ({ className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
        <SkeletonLoader width="w-full" height="h-48" rounded="rounded-none" />
        <div className="p-6 space-y-3">
            <SkeletonLoader width="w-3/4" height="h-6" />
            <SkeletonLoader width="w-full" height="h-4" />
            <SkeletonLoader width="w-1/2" height="h-4" />
            <div className="flex justify-between items-center pt-4">
                <SkeletonLoader width="w-20" height="h-4" />
                <SkeletonLoader width="w-24" height="h-8" rounded="rounded-lg" />
            </div>
        </div>
    </div>
)

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <SkeletonLoader width="w-48" height="h-6" />
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <SkeletonLoader
                            key={colIndex}
                            width={colIndex === 0 ? "w-32" : "w-24"}
                            height="h-4"
                        />
                    ))}
                </div>
            ))}
        </div>
    </div>
)

export const SkeletonStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <SkeletonLoader width="w-20" height="h-4" />
                        <SkeletonLoader width="w-16" height="h-8" />
                    </div>
                    <SkeletonLoader width="w-12" height="h-12" rounded="rounded-lg" />
                </div>
            </div>
        ))}
    </div>
)

export default SkeletonLoader