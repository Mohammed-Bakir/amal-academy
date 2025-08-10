import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiX } from 'react-icons/fi'

const FloatingActionButton = ({
    actions = [],
    mainIcon: MainIcon = FiPlus,
    position = 'bottom-right',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const positions = {
        'bottom-right': 'fixed bottom-6 right-6 rtl:right-auto rtl:left-6',
        'bottom-left': 'fixed bottom-6 left-6 rtl:left-auto rtl:right-6',
        'top-right': 'fixed top-6 right-6 rtl:right-auto rtl:left-6',
        'top-left': 'fixed top-6 left-6 rtl:left-auto rtl:right-6'
    }

    const mainButtonVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: {
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
        },
        tap: { scale: 0.9 }
    }

    const actionButtonVariants = {
        initial: { scale: 0, opacity: 0, y: 20 },
        animate: (i) => ({
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                type: 'spring',
                stiffness: 260,
                damping: 20
            }
        }),
        exit: (i) => ({
            scale: 0,
            opacity: 0,
            y: 20,
            transition: {
                delay: (actions.length - i - 1) * 0.05,
                duration: 0.2
            }
        }),
        hover: {
            scale: 1.1,
            x: position.includes('right') ? -5 : 5
        }
    }

    const overlayVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* FAB Container */}
            <div className={`${positions[position]} z-50 ${className}`}>
                {/* Action Buttons */}
                <AnimatePresence>
                    {isOpen && (
                        <div className="flex flex-col items-center space-y-3 mb-4">
                            {actions.map((action, index) => {
                                const Icon = action.icon
                                return (
                                    <motion.button
                                        key={action.id || index}
                                        className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                        variants={actionButtonVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        whileHover="hover"
                                        whileTap={{ scale: 0.9 }}
                                        custom={index}
                                        onClick={() => {
                                            action.onClick()
                                            setIsOpen(false)
                                        }}
                                        title={action.label}
                                    >
                                        <Icon className="w-5 h-5" />

                                        {/* Tooltip */}
                                        <div className={`absolute ${position.includes('right') ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                                            {action.label}
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>
                    )}
                </AnimatePresence>

                {/* Main FAB */}
                <motion.button
                    className="w-14 h-14 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
                    variants={mainButtonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <FiX className="w-6 h-6" /> : <MainIcon className="w-6 h-6" />}
                    </motion.div>
                </motion.button>
            </div>
        </>
    )
}

export default FloatingActionButton