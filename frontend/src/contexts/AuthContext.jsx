import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import api from '@services/api'
import toast from 'react-hot-toast'

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
}

// Action types
const AUTH_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    UPDATE_USER: 'UPDATE_USER',
}

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            }
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            }
        case AUTH_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        case AUTH_ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            }
        default:
            return state
    }
}

// Create context
const AuthContext = createContext()

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    // Interceptors are now handled in the api service

    // Check authentication status on app load
    const checkAuthStatus = useCallback(async () => {
        try {
            const token = localStorage.getItem('amal-token')
            if (!token) {
                dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
                return
            }

            // Handle mock tokens for testing
            if (token === 'mock-admin-token') {
                const mockAdminUser = {
                    id: 1,
                    firstName: 'Admin',
                    lastName: 'User',
                    email: 'admin@amalacademy.com',
                    role: 'admin'
                }
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: mockAdminUser })
                return
            }

            if (token === 'mock-instructor-token') {
                const mockInstructorUser = {
                    id: 2,
                    firstName: 'Instructor',
                    lastName: 'User',
                    email: 'instructor@amalacademy.com',
                    role: 'instructor'
                }
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: mockInstructorUser })
                return
            }

            if (token === 'mock-student-token') {
                const mockStudentUser = {
                    id: 3,
                    firstName: 'Ahmed',
                    lastName: 'Mohammed',
                    email: 'student@amalacademy.com',
                    role: 'student'
                }
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: mockStudentUser })
                return
            }

            const response = await api.get('/auth/me')
            if (response.data.success) {
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.data.user })
            } else {
                localStorage.removeItem('amal-token')
                dispatch({ type: AUTH_ACTIONS.LOGOUT })
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            localStorage.removeItem('amal-token')
            dispatch({ type: AUTH_ACTIONS.LOGOUT })
        }
    }, [dispatch])

    // Login function
    const login = async (credentials) => {
        try {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
            dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

            // Check for mock admin credentials first
            if (credentials.email === 'admin@amalacademy.com') {
                const mockAdminUser = {
                    id: 1,
                    firstName: 'Admin',
                    lastName: 'User',
                    email: 'admin@amalacademy.com',
                    role: 'admin'
                }
                localStorage.setItem('amal-token', 'mock-admin-token')
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: mockAdminUser })
                toast.success(`مرحباً ${mockAdminUser.firstName}! 🎉`)
                return { success: true }
            }

            // Check for mock instructor credentials
            if (credentials.email === 'instructor@amalacademy.com') {
                const mockInstructorUser = {
                    id: 2,
                    firstName: 'Instructor',
                    lastName: 'User',
                    email: 'instructor@amalacademy.com',
                    role: 'instructor'
                }
                localStorage.setItem('amal-token', 'mock-instructor-token')
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: mockInstructorUser })
                toast.success(`مرحباً ${mockInstructorUser.firstName}! 🎉`)
                return { success: true }
            }

            // Check for mock student credentials
            if (credentials.email === 'student@amalacademy.com') {
                const mockStudentUser = {
                    id: 3,
                    firstName: 'Ahmed',
                    lastName: 'Mohammed',
                    email: 'student@amalacademy.com',
                    role: 'student'
                }
                localStorage.setItem('amal-token', 'mock-student-token')
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: mockStudentUser })
                toast.success(`مرحباً ${mockStudentUser.firstName}! 🎉`)
                return { success: true }
            }

            const response = await api.post('/auth/login', credentials)

            if (response.data.success) {
                const { user, token } = response.data
                localStorage.setItem('amal-token', token)
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user })

                toast.success(`مرحباً ${user.firstName}! 🎉`)
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في تسجيل الدخول'
            dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message })
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Register function
    const register = async (userData) => {
        try {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })
            dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })

            const response = await api.post('/auth/register', userData)

            if (response.data.success) {
                const { user, token } = response.data
                localStorage.setItem('amal-token', token)
                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user })

                toast.success(`مرحباً بك في أكاديمية الأمل ${user.firstName}! 🎓`)
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في إنشاء الحساب'
            dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message })
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Logout function
    const logout = () => {
        localStorage.removeItem('amal-token')
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
        toast.success('تم تسجيل الخروج بنجاح')
    }

    // Update user profile
    const updateProfile = async (updates) => {
        try {
            const response = await api.put('/users/profile', updates)

            if (response.data.success) {
                dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: response.data.user })
                toast.success('تم تحديث الملف الشخصي بنجاح')
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في تحديث الملف الشخصي'
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Change password
    const changePassword = async (passwordData) => {
        try {
            const response = await api.put('/auth/change-password', passwordData)

            if (response.data.success) {
                toast.success('تم تغيير كلمة المرور بنجاح')
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في تغيير كلمة المرور'
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email })

            if (response.data.success) {
                toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني')
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في إرسال رابط إعادة التعيين'
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Reset password
    const resetPassword = async (token, newPassword) => {
        try {
            const response = await api.post('/auth/reset-password', {
                token,
                password: newPassword,
            })

            if (response.data.success) {
                toast.success('تم إعادة تعيين كلمة المرور بنجاح')
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في إعادة تعيين كلمة المرور'
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Enroll in course
    const enrollInCourse = async (courseId) => {
        try {
            const response = await api.post(`/courses/${courseId}/enroll`)

            if (response.data.success) {
                // Update user's enrolled courses
                const updatedUser = {
                    ...state.user,
                    enrolledCourses: [...(state.user.enrolledCourses || []), {
                        course: courseId,
                        enrolledAt: new Date(),
                        progress: 0,
                    }]
                }
                dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: updatedUser })
                toast.success('تم التسجيل في الدورة بنجاح! 🎓')
                return { success: true }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'فشل في التسجيل في الدورة'
            toast.error(message)
            return { success: false, error: message }
        }
    }

    // Update course progress
    const updateCourseProgress = async (courseId, lessonId, progress) => {
        try {
            const response = await api.put(`/progress/course/${courseId}`, {
                lessonId,
                progress,
            })

            if (response.data.success) {
                // Update user's course progress
                const updatedCourses = state.user.enrolledCourses.map(enrollment =>
                    enrollment.course === courseId
                        ? { ...enrollment, progress: Math.max(enrollment.progress, progress) }
                        : enrollment
                )

                dispatch({
                    type: AUTH_ACTIONS.UPDATE_USER,
                    payload: { enrolledCourses: updatedCourses }
                })

                return { success: true }
            }
        } catch (error) {
            console.error('Failed to update progress:', error)
            return { success: false }
        }
    }

    // Check if user is enrolled in course
    const isEnrolledInCourse = (courseId) => {
        if (!state.user || !state.user.enrolledCourses) return false
        return state.user.enrolledCourses.some(enrollment => {
            const enrollmentCourseId = enrollment.course?._id || enrollment.course
            return enrollmentCourseId?.toString() === courseId?.toString()
        })
    }

    // Get course progress
    const getCourseProgress = (courseId) => {
        if (!state.user || !state.user.enrolledCourses) return 0
        const enrollment = state.user.enrolledCourses.find(enrollment => {
            const enrollmentCourseId = enrollment.course?._id || enrollment.course
            return enrollmentCourseId?.toString() === courseId?.toString()
        })
        return enrollment?.progress || 0
    }

    const value = {
        ...state,
        checkAuthStatus,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
        enrollInCourse,
        updateCourseProgress,
        isEnrolledInCourse,
        getCourseProgress,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext