import React from 'react'
import { useTranslation } from 'react-i18next'

const Terms = () => {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-secondary-50">
            <div className="container py-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                        {t('common.terms')}
                    </h1>
                    <p className="text-secondary-600">Terms and conditions coming soon!</p>
                </div>
            </div>
        </div>
    )
}

export default Terms