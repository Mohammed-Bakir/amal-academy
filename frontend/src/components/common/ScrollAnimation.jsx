import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ScrollAnimation = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    triggerOnce = true,
    className = ''
}) => {
    const [ref, inView] = useInView({
        threshold,
        triggerOnce
    })

    const animations = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        fadeInUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        fadeInDown: {
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 }
        },
        fadeInLeft: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
        },
        fadeInRight: {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        slideInUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
        },
        slideInDown: {
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 }
        },
        rotateIn: {
            hidden: { opacity: 0, rotate: -10 },
            visible: { opacity: 1, rotate: 0 }
        },
        bounceIn: {
            hidden: { opacity: 0, scale: 0.3 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: 'spring',
                    damping: 10,
                    stiffness: 100
                }
            }
        }
    }

    const selectedAnimation = animations[animation] || animations.fadeInUp

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={selectedAnimation}
            transition={{
                duration,
                delay,
                ease: 'easeOut'
            }}
        >
            {children}
        </motion.div>
    )
}

// Preset components for common use cases
export const FadeInSection = ({ children, delay = 0, className = '' }) => (
    <ScrollAnimation animation="fadeInUp" delay={delay} className={className}>
        {children}
    </ScrollAnimation>
)

export const ScaleInCard = ({ children, delay = 0, className = '' }) => (
    <ScrollAnimation animation="scaleIn" delay={delay} className={className}>
        {children}
    </ScrollAnimation>
)

export const SlideInLeft = ({ children, delay = 0, className = '' }) => (
    <ScrollAnimation animation="fadeInLeft" delay={delay} className={className}>
        {children}
    </ScrollAnimation>
)

export const SlideInRight = ({ children, delay = 0, className = '' }) => (
    <ScrollAnimation animation="fadeInRight" delay={delay} className={className}>
        {children}
    </ScrollAnimation>
)

export const BounceInElement = ({ children, delay = 0, className = '' }) => (
    <ScrollAnimation animation="bounceIn" delay={delay} className={className}>
        {children}
    </ScrollAnimation>
)

export default ScrollAnimation