import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                        {t('auth.forgotPassword.title')}
                    </h1>
                    <p className="text-secondary-600">Forgot password page coming soon!</p>
                </div>
                <div className="text-center">
                    <Link to="/login" className="text-primary-600 hover:text-primary-500">
                        {t('auth.forgotPassword.backToLogin')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword