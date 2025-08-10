import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import { AuthProvider } from '@contexts/AuthContext'
import { LanguageProvider } from '@contexts/LanguageContext'
import { ThemeProvider } from '@contexts/ThemeContext'
import { ProgressProvider } from '@contexts/ProgressContext'

import '@i18n/i18n'
import '@styles/index.css'

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
        },
        mutations: {
            retry: 1,
        },
    },
})

// Error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Application Error:', error, errorInfo)

        // In production, you might want to send this to an error reporting service
        if (import.meta.env.PROD) {
            // Example: Sentry.captureException(error);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-5">
                    <div className="bg-gradient-primary text-white p-10 rounded-xl max-w-md w-full text-center">
                        <h1 className="text-2xl font-bold mb-4">حدث خطأ غير متوقع</h1>
                        <h2 className="text-xl mb-5 opacity-90">Something went wrong</h2>
                        <p className="mb-6 opacity-80">
                            نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً
                        </p>
                        <p className="mb-6 opacity-80">
                            We apologize for this error. Please reload the page or try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            إعادة تحميل / Reload
                        </button>
                    </div>

                    {import.meta.env.DEV && (
                        <details className="mt-5 p-5 bg-gray-50 rounded-lg max-w-4xl w-full">
                            <summary className="cursor-pointer font-semibold">
                                Error Details (Development Only)
                            </summary>
                            <pre className="mt-2.5 p-2.5 bg-gray-900 text-gray-100 rounded text-xs overflow-auto">
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

// Toast configuration
const toastOptions = {
    duration: 4000,
    position: 'top-center',
    style: {
        background: '#1e293b',
        color: '#fff',
        fontFamily: 'Noto Sans Arabic, Inter, sans-serif',
        fontSize: '14px',
        borderRadius: '8px',
        padding: '12px 16px',
    },
    success: {
        iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
        },
    },
    error: {
        iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
        },
    },
    loading: {
        iconTheme: {
            primary: '#2563eb',
            secondary: '#fff',
        },
    },
}

// Main application wrapper
const AppWrapper = () => {
    return (
        <ErrorBoundary>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true
                        }}
                    >
                        <LanguageProvider>
                            <ThemeProvider>
                                <AuthProvider>
                                    <ProgressProvider>
                                        <App />
                                        <Toaster toastOptions={toastOptions} />
                                    </ProgressProvider>
                                </AuthProvider>
                            </ThemeProvider>
                        </LanguageProvider>
                    </BrowserRouter>
                    {import.meta.env.DEV && (
                        <ReactQueryDevtools initialIsOpen={false} />
                    )}
                </QueryClientProvider>
            </HelmetProvider>
        </ErrorBoundary>
    )
}

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />)

// Performance monitoring for production
if (import.meta.env.PROD) {
    // Web Vitals reporting
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
    })
}