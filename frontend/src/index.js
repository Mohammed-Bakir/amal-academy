import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';

import './i18n/i18n';
import './styles/index.css';

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
        },
        mutations: {
            retry: 1,
        },
    },
});

// Error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Application Error:', error, errorInfo);

        // In production, you might want to send this to an error reporting service
        if (process.env.NODE_ENV === 'production') {
            // Example: Sentry.captureException(error);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '20px',
                    textAlign: 'center',
                    fontFamily: 'Noto Sans Arabic, Inter, sans-serif'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '40px',
                        borderRadius: '12px',
                        maxWidth: '500px',
                        width: '100%'
                    }}>
                        <h1 style={{ marginBottom: '16px', fontSize: '24px' }}>
                            حدث خطأ غير متوقع
                        </h1>
                        <h2 style={{ marginBottom: '20px', fontSize: '20px', opacity: 0.9 }}>
                            Something went wrong
                        </h2>
                        <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                            نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً
                        </p>
                        <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                            We apologize for this error. Please reload the page or try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                background: 'white',
                                color: '#2563eb',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            إعادة تحميل / Reload
                        </button>
                    </div>

                    {process.env.NODE_ENV === 'development' && (
                        <details style={{
                            marginTop: '20px',
                            padding: '20px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            maxWidth: '800px',
                            width: '100%'
                        }}>
                            <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                                Error Details (Development Only)
                            </summary>
                            <pre style={{
                                marginTop: '10px',
                                padding: '10px',
                                background: '#1e293b',
                                color: '#e2e8f0',
                                borderRadius: '4px',
                                fontSize: '12px',
                                overflow: 'auto'
                            }}>
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
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
};

// Main application wrapper
const AppWrapper = () => {
    return (
        <ErrorBoundary>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
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
                    {process.env.NODE_ENV === 'development' && (
                        <ReactQueryDevtools initialIsOpen={false} />
                    )}
                </QueryClientProvider>
            </HelmetProvider>
        </ErrorBoundary>
    );
};

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
    // Web Vitals reporting
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
    });
}

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}