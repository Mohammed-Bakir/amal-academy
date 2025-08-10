import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { useAuth } from '@contexts/AuthContext'
import { useLanguage } from '@contexts/LanguageContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const Login = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { login, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const from = location.state?.from?.pathname || '/dashboard'

    const onSubmit = async (data) => {
        try {
            const result = await login({
                ...data,
                rememberMe
            })

            if (result.success) {
                navigate(from, { replace: true })
            } else {
                setError('root', {
                    type: 'manual',
                    message: result.error
                })
            }
        } catch (error) {
            setError('root', {
                type: 'manual',
                message: t('common.error')
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mb-6">
                        <FiUser className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                        {t('auth.login.title')}
                    </h1>
                    <p className="text-secondary-600">
                        {t('auth.login.subtitle')}
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                                {t('auth.login.email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`
                                        block w-full pl-10 pr-3 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.email ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                        ${isArabic ? 'text-right' : 'text-left'}
                                    `}
                                    placeholder={t('auth.login.email')}
                                    {...register('email', {
                                        required: t('auth.login.email') + ' مطلوب',
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: 'يرجى إدخال بريد إلكتروني صحيح'
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                                {t('auth.login.password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    className={`
                                        block w-full pl-10 pr-10 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.password ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                        ${isArabic ? 'text-right' : 'text-left'}
                                    `}
                                    placeholder={t('auth.login.password')}
                                    {...register('password', {
                                        required: t('auth.login.password') + ' مطلوبة',
                                        minLength: {
                                            value: 6,
                                            message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                                    ) : (
                                        <FiEye className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 rtl:ml-0 rtl:mr-2 block text-sm text-secondary-700">
                                    {t('auth.login.remember')}
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                                >
                                    {t('auth.login.forgot')}
                                </Link>
                            </div>
                        </div>

                        {/* Error Message */}
                        {errors.root && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className={`
                                w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg
                                text-sm font-medium text-white bg-primary-600 hover:bg-primary-700
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-colors duration-200
                            `}
                        >
                            {(isSubmitting || loading) ? (
                                <>
                                    <LoadingSpinner size="small" color="white" className="mr-2 rtl:mr-0 rtl:ml-2" />
                                    {t('common.loading')}
                                </>
                            ) : (
                                t('auth.login.submit')
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-secondary-600">
                            {t('auth.login.noAccount')}{' '}
                            <Link
                                to="/register"
                                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                            >
                                {t('auth.login.createAccount')}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">
                        {isArabic ? 'بيانات تجريبية للاختبار:' : 'Demo Credentials:'}
                    </h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <p><strong>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> demo@amalacademy.com</p>
                        <p><strong>{isArabic ? 'كلمة المرور:' : 'Password:'}</strong> demo123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login