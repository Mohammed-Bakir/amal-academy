/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Custom colors for Amal Academy
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb', // Main brand color
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554',
                },
                // Enhanced Dark theme colors - Black, Green, Golden
                dark: {
                    bg: '#0a0a0a',        // Deep black background
                    surface: '#1a1a1a',   // Slightly lighter black for cards
                    elevated: '#2a2a2a',  // Elevated surfaces
                    border: '#333333',    // Dark gray for borders
                    text: '#ffffff',      // White text
                    muted: '#a0a0a0',     // Muted gray text
                    accent: '#f59e0b',    // Gold accent
                    success: '#22c55e',   // Green success
                },
                accent: {
                    green: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        200: '#bbf7d0',
                        300: '#86efac',
                        400: '#4ade80',
                        500: '#22c55e',     // Main green
                        600: '#16a34a',
                        700: '#15803d',
                        800: '#166534',
                        900: '#14532d',
                    },
                    gold: {
                        50: '#fffbeb',
                        100: '#fef3c7',
                        200: '#fde68a',
                        300: '#fcd34d',
                        400: '#fbbf24',
                        500: '#f59e0b',     // Main gold
                        600: '#d97706',
                        700: '#b45309',
                        800: '#92400e',
                        900: '#78350f',
                    },
                },
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                success: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                warning: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                error: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
            },

            // Custom fonts
            fontFamily: {
                'arabic': ['Noto Sans Arabic', 'system-ui', 'sans-serif'],
                'english': ['Inter', 'system-ui', 'sans-serif'],
                'sans': ['Noto Sans Arabic', 'Inter', 'system-ui', 'sans-serif'],
            },

            // Custom spacing
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },

            // Custom animations
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'slide-left': 'slideLeft 0.3s ease-out',
                'slide-right': 'slideRight 0.3s ease-out',
                'bounce-gentle': 'bounceGentle 2s infinite',
                'pulse-gentle': 'pulseGentle 2s infinite',
                'spin-slow': 'spin 3s linear infinite',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulseGentle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },

            // Custom shadows
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 20px rgba(37, 99, 235, 0.3)',
            },

            // Custom gradients
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-success': 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
                'gradient-warning': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                'gradient-error': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                'gradient-dark-gold': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #f59e0b 100%)',
                'gradient-dark-green': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #22c55e 100%)',
                'gradient-gold-green': 'linear-gradient(135deg, #f59e0b 0%, #22c55e 100%)',
            },

            // Custom border radius
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },

            // Custom transitions
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
            },

            // Custom z-index
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },

            // Custom aspect ratios for video content
            aspectRatio: {
                '16/9': '16 / 9',
                '4/3': '4 / 3',
                '21/9': '21 / 9',
            },
        },
    },
    plugins: [
        // Add any additional Tailwind plugins here
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],

    // Dark mode configuration
    darkMode: 'class',

    // RTL support
    corePlugins: {
        // Enable/disable core plugins as needed
    },
}