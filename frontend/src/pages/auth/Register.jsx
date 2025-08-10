import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi'
import { useAuth } from '@contexts/AuthContext'
import { useLanguage } from '@contexts/LanguageContext'
import LoadingSpinner from '@components/common/LoadingSpinner'

const Register = () => {
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { register: authRegister, loading } = useAuth()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false
        }
    })

    const watchPassword = watch('password')

    const onSubmit = async (data) => {
        try {
            const result = await authRegister({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            })

            if (result.success) {
                navigate('/dashboard')
            } else {
                setError('root', {
                    type: 'manual',
                    message: result.error
                })
            }
        } catch (error) {
            setError('root', {
                type: 'manual',
                message: 'Registration failed'
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mb-6">
                        <FiUserPlus className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                        {isArabic ? 'إنشاء حساب جديد' : 'Create Account'}
                    </h1>
                    <p className="text-secondary-600">
                        {isArabic ? 'انضم إلى أكاديمية الأمل' : 'Join Amal Academy'}
                    </p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    {isArabic ? 'الاسم الأول' : 'First Name'}
                                </label>
                                <input
                                    type="text"
                                    className={`
                                        block w-full px-3 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                    `}
                                    placeholder={isArabic ? 'الاسم الأول' : 'First Name'}
                                    {...register('firstName', {
                                        required: isArabic ? 'الاسم الأول مطلوب' : 'First name is required'
                                    })}
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    {isArabic ? 'اسم العائلة' : 'Last Name'}
                                </label>
                                <input
                                    type="text"
                                    className={`
                                        block w-full px-3 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                    `}
                                    placeholder={isArabic ? 'اسم العائلة' : 'Last Name'}
                                    {...register('lastName', {
                                        required: isArabic ? 'اسم العائلة مطلوب' : 'Last name is required'
                                    })}
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">
                                {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type="email"
                                    className={`
                                        block w-full pl-10 pr-3 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.email ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                    `}
                                    placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                                    {...register('email', {
                                        required: isArabic ? 'البريد الإلكتروني مطلوب' : 'Email is required',
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: isArabic ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email'
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
                            <label className="block text-sm font-medium text-secondary-700 mb-2">
                                {isArabic ? 'كلمة المرور' : 'Password'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`
                                        block w-full pl-10 pr-10 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.password ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                    `}
                                    placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                                    {...register('password', {
                                        required: isArabic ? 'كلمة المرور مطلوبة' : 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: isArabic ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters'
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

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">
                                {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className={`
                                        block w-full pl-10 pr-10 py-3 border rounded-lg
                                        placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                        ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-secondary-300'}
                                    `}
                                    placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                                    {...register('confirmPassword', {
                                        required: isArabic ? 'تأكيد كلمة المرور مطلوب' : 'Password confirmation is required',
                                        validate: value =>
                                            value === watchPassword || (isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match')
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                                    ) : (
                                        <FiEye className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        <div>
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    className={`
                                        h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded mt-1
                                        ${errors.agreeToTerms ? 'border-red-300' : ''}
                                    `}
                                    {...register('agreeToTerms', {
                                        required: isArabic ? 'يجب الموافقة على الشروط والأحكام' : 'You must agree to the terms and conditions'
                                    })}
                                />
                                <span className="ml-3 rtl:ml-0 rtl:mr-3 text-sm text-secondary-700">
                                    {isArabic ? 'أوافق على ' : 'I agree to the '}
                                    <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                                        {isArabic ? 'الشروط والأحكام' : 'Terms and Conditions'}
                                    </Link>
                                    {isArabic ? ' و' : ' and '}
                                    <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                                        {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
                                    </Link>
                                </span>
                            </label>
                            {errors.agreeToTerms && (
                                <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
                            )}
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
                                    {isArabic ? 'جاري الإنشاء...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    <FiUserPlus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                    {isArabic ? 'إنشاء الحساب' : 'Create Account'}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-secondary-600">
                            {isArabic ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
                            <Link
                                to="/login"
                                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                            >
                                {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register