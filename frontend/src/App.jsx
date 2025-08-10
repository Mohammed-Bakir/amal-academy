import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

// Context hooks
import { useAuth } from '@contexts/AuthContext'
import { useLanguage } from '@contexts/LanguageContext'
import { useTheme } from '@contexts/ThemeContext'

// Layout components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import LoadingSpinner from '@components/common/LoadingSpinner'
import ScrollToTop from '@components/common/ScrollToTop'

// Page components (lazy loaded for better performance)
const Home = React.lazy(() => import('./pages/Home'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'));
const VideoPlayer = React.lazy(() => import('./pages/VideoPlayer'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Search = React.lazy(() => import('./pages/Search'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Admin components (for instructors and admins)
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const CourseManagement = React.lazy(() => import('./pages/admin/CourseManagement'));
const VideoManagement = React.lazy(() => import('./pages/admin/VideoManagement'));
const StudentManagement = React.lazy(() => import('./pages/admin/StudentManagement'));

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public route wrapper (redirect if already authenticated)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Main App component
function App() {
    const { t } = useTranslation();
    const { language, direction } = useLanguage();
    const { theme } = useTheme();
    const { checkAuthStatus } = useAuth();

    // Set document direction and language
    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = language;

        // Update theme classes properly
        document.documentElement.className = `theme-${theme}`;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [direction, language, theme]);

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Loading fallback component
    const PageLoadingFallback = () => (
        <div className="page-loading">
            <LoadingSpinner size="large" />
            <p className="loading-text">{t('common.loading')}</p>
        </div>
    );

    return (
        <div className="app">
            <Helmet>
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')} />
                <meta name="keywords" content={t('meta.keywords')} />
                <html lang={language} dir={direction} />
            </Helmet>

            <ScrollToTop />

            <div className="app-container">
                <Suspense fallback={<PageLoadingFallback />}>
                    <Routes>
                        {/* Full-screen Video Player Route (no header/footer) */}
                        <Route path="/watch/:courseSlug/:videoSlug" element={<VideoPlayer />} />

                        {/* All other routes with header and footer */}
                        <Route path="*" element={
                            <>
                                <Header />
                                <main className="main-content">
                                    <Routes>
                                        {/* Public Routes */}
                                        <Route path="/" element={<Home />} />
                                        <Route path="/courses" element={<Courses />} />
                                        <Route path="/courses/:slug" element={<CourseDetail />} />
                                        <Route path="/categories" element={<Categories />} />
                                        <Route path="/categories/:slug" element={<Courses />} />
                                        <Route path="/search" element={<Search />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/privacy" element={<Privacy />} />
                                        <Route path="/terms" element={<Terms />} />

                                        {/* Authentication Routes */}
                                        <Route path="/login" element={
                                            <PublicRoute>
                                                <Login />
                                            </PublicRoute>
                                        } />
                                        <Route path="/register" element={
                                            <PublicRoute>
                                                <Register />
                                            </PublicRoute>
                                        } />
                                        <Route path="/forgot-password" element={
                                            <PublicRoute>
                                                <ForgotPassword />
                                            </PublicRoute>
                                        } />

                                        {/* Protected Student Routes */}
                                        <Route path="/dashboard" element={
                                            <ProtectedRoute>
                                                <Dashboard />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/profile" element={
                                            <ProtectedRoute>
                                                <Profile />
                                            </ProtectedRoute>
                                        } />

                                        {/* Protected Instructor/Admin Routes */}
                                        <Route path="/admin" element={
                                            <ProtectedRoute requiredRole="instructor">
                                                <AdminDashboard />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/courses" element={
                                            <ProtectedRoute requiredRole="instructor">
                                                <CourseManagement />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/videos" element={
                                            <ProtectedRoute requiredRole="instructor">
                                                <VideoManagement />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/students" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <StudentManagement />
                                            </ProtectedRoute>
                                        } />

                                        {/* Catch all route */}
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </main>
                                <Footer />
                            </>
                        } />
                    </Routes>
                </Suspense>
            </div>

            {/* Global modals and overlays can go here */}
            <div id="modal-root"></div>
            <div id="tooltip-root"></div>
        </div>
    );
}

export default App;